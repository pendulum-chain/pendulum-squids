const express = require('express')
const fs = require('fs')
const axios = require('axios')
const { execSync } = require('child_process')

const app = express()
const port = 3000
let runtime

function readLocalMetadata(metadataFile) {
    console.log(`Reading local metadata from ${metadataFile}`)
    const localMetadataContent = fs.readFileSync(metadataFile, 'utf-8')
    return localMetadataContent.trim()
}

function updateTypegenFile(runtime, newSpecVersionUrl) {
    console.log(
        `Updating typegen file for ${runtime} with URL ${newSpecVersionUrl}`
    )
    const typegenFile = `./typegen-${runtime}.json`
    const typegenConfig = JSON.parse(fs.readFileSync(typegenFile, 'utf-8'))
    const originalSpecVersionUrl = typegenConfig.specVersions
    typegenConfig.specVersions = newSpecVersionUrl
    fs.writeFileSync(typegenFile, JSON.stringify(typegenConfig, null, 4))
    return originalSpecVersionUrl
}

function revertTypegenFile(runtime, originalSpecVersionUrl) {
    console.log(
        `Reverting typegen file for ${runtime} to URL ${originalSpecVersionUrl}`
    )
    const typegenFile = `./typegen-${runtime}.json`
    const typegenConfig = JSON.parse(fs.readFileSync(typegenFile, 'utf-8'))
    typegenConfig.specVersions = originalSpecVersionUrl
    fs.writeFileSync(typegenFile, JSON.stringify(typegenConfig, null, 4))
}

app.get('/', async (req, res) => {
    const metadataFile = `./local-archive-endpoint/runtime.metadata`
    const archiveURL = `https://v2.archive.subsquid.io/metadata/${runtime}`

    try {
        console.log(`Fetching metadata from ${archiveURL}`)
        // Fetch the original metadata from the archive
        const response = await axios.get(archiveURL)
        const metadata = response.data
        console.log('Fetched original metadata successfully')

        // Find the last occurrence of "specVersion": and extract the value
        const lastSpecVersionIndex = metadata.lastIndexOf('"specVersion":')
        if (lastSpecVersionIndex === -1) {
            throw new Error('specVersion not found in the original metadata')
        }

        const startIndex = lastSpecVersionIndex + '"specVersion":'.length
        const endIndex = metadata.indexOf(',', startIndex)

        const specVersionString = metadata
            .substring(startIndex, endIndex)
            .trim()
        const specVersion = parseInt(specVersionString, 10)

        if (isNaN(specVersion)) {
            throw new Error('Failed to parse specVersion')
        }

        console.log('Spec version:', specVersion)

        const newSpecVersion = specVersion + 1

        console.log('Reading local runtime metadata')
        const localRuntimeMetadata = readLocalMetadata(metadataFile)
        const customMetadata = {
            blockNumber: 0,
            blockHash: '0x0000',
            specName: runtime,
            specVersion: newSpecVersion,
            metadata: localRuntimeMetadata,
        }

        const metadataArray = metadata
            .trim()
            .split('\n')
            .map((line) => JSON.parse(line))
        const customMetadataString = JSON.stringify(customMetadata)
        const combinedMetadataString =
            metadataArray.map((obj) => JSON.stringify(obj)).join('\n') +
            '\n' +
            customMetadataString

        console.log('Serving combined metadata')
        res.send(combinedMetadataString)
    } catch (error) {
        console.error(`Error fetching or processing metadata: ${error.message}`)
        res.status(500).send('Error fetching or processing metadata')
    }
})

function startServer() {
    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
            resolve(server)
        })
    })
}

async function run(runtimeParam) {
    runtime = runtimeParam

    const subwasmCommand = `subwasm metadata local-archive-endpoint/${runtime}_runtime.compact.compressed.wasm -f hex+scale > local-archive-endpoint/runtime.metadata`
    try {
        console.log('Extracting metadata with subwasm')
        execSync(subwasmCommand, { stdio: 'inherit' })
        console.log('Metadata extracted successfully')

        const newSpecVersionUrl = `http://localhost:${port}`
        const originalSpecVersionUrl = updateTypegenFile(
            runtime,
            newSpecVersionUrl
        )

        const server = await startServer()

        setTimeout(() => {
            try {
                console.log('Running typegen command...')
                const typegenCommand = `sqd typegen:${runtime}`
                execSync(typegenCommand, { stdio: 'inherit' })
                console.log('Typegen command completed successfully')
            } catch (error) {
                console.error(`Error running typegen command: ${error.message}`)
            } finally {
                revertTypegenFile(runtime, originalSpecVersionUrl)
                console.log('Shutting down server...')
                server.close(() => {
                    process.exit(0)
                })
            }
        }, 5000)
    } catch (error) {
        console.error(`Error running subwasm or typegen: ${error.message}`)
        process.exit(1)
    }
}

const runtimeParam = process.argv[2]
if (!runtimeParam) {
    console.error('Usage: sqd pre-runtime-upgrade <runtime_name>')
    process.exit(1)
}

run(runtimeParam)
