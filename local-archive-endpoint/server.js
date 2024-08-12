const express = require('express')
const fs = require('fs')
const axios = require('axios')
const { spawn, execSync } = require('child_process')

const app = express()
const port = 3000

const runtime = process.argv[2]
const runtimeBinaryPath = process.argv[3]
const allowedRuntimes = ['pendulum', 'amplitude', 'foucoco']

function readLocalMetadata(metadataFile) {
    console.log(`Reading local metadata from ${metadataFile}`)
    const localMetadataContent = fs.readFileSync(metadataFile, 'utf-8')
    return localMetadataContent.trim()
}

function updateTypegenFile(newSpecVersionUrl) {
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

function revertTypegenFile(originalSpecVersionUrl) {
    console.log(
        `Reverting typegen file for ${runtime} to URL ${originalSpecVersionUrl}`
    )
    const typegenFile = `./typegen-${runtime}.json`
    const typegenConfig = JSON.parse(fs.readFileSync(typegenFile, 'utf-8'))
    typegenConfig.specVersions = originalSpecVersionUrl
    fs.writeFileSync(typegenFile, JSON.stringify(typegenConfig, null, 4))
}

function concatenateMetadata(metadata, customMetadata) {
    const metadataArray = metadata
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line))
    const customMetadataString = JSON.stringify(customMetadata)
    const combinedMetadataString =
        metadataArray.map((obj) => JSON.stringify(obj)).join('\n') +
        '\n' +
        customMetadataString
    return combinedMetadataString
}

// Finds the last occurrence of `"specVersion":` and extracts the value
// Used for incrementing the specVersion in the custom metadata
function getLastSpecVersion(metadata) {
    const lastSpecVersionIndex = metadata.lastIndexOf('"specVersion":')
    if (lastSpecVersionIndex === -1) {
        throw new Error('specVersion not found in the original metadata')
    }

    const startIndex = lastSpecVersionIndex + '"specVersion":'.length
    const endIndex = metadata.indexOf(',', startIndex)

    const specVersionString = metadata.substring(startIndex, endIndex).trim()
    const specVersion = parseInt(specVersionString, 10)

    if (isNaN(specVersion)) {
        throw new Error('Failed to parse specVersion')
    }
    return specVersion
}

function startServer() {
    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log(
                `Local archive endpoint running at http://localhost:${port}`
            )
            resolve(server)
        })
    })
}

function runTypegenCommand() {
    return new Promise((resolve, reject) => {
        console.log('Running typegen command...')
        const typegenProcess = spawn('sqd', ['typegen:' + runtime], {
            stdio: 'inherit',
        })

        typegenProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Typegen command completed successfully')
                resolve()
            } else {
                reject(new Error(`Typegen command failed with code ${code}`))
            }
        })
    })
}

app.get('/', async (req, res) => {
    const metadataFile = `./local-archive-endpoint/${runtime}.metadata`
    const archiveURL = `https://v2.archive.subsquid.io/metadata/${runtime}`

    try {
        console.log(`Fetching original metadata from ${archiveURL}`)
        const response = await axios.get(archiveURL)
        const metadata = response.data
        console.log('Fetched original metadata successfully')

        const latestSpecVersion = getLastSpecVersion(metadata)
        const newSpecVersion = latestSpecVersion + 1

        const localRuntimeMetadata = readLocalMetadata(metadataFile)
        const customMetadata = {
            blockNumber: 0,
            blockHash: '0x0000',
            specName: runtime,
            specVersion: newSpecVersion,
            metadata: localRuntimeMetadata,
        }

        const concatMetadata = concatenateMetadata(metadata, customMetadata)

        res.send(concatMetadata)
    } catch (error) {
        console.error(`Error fetching or processing metadata: ${error.message}`)
        res.status(500).send('Error fetching or processing metadata')
    }
})

async function run() {
    try {
        console.log('Extracting metadata with subwasm')
        const subwasmCommand = `subwasm metadata ${runtimeBinaryPath} -f hex+scale > local-archive-endpoint/${runtime}.metadata`
        execSync(subwasmCommand, { stdio: 'inherit' })
        console.log('Metadata extracted successfully')

        const newSpecVersionUrl = `http://localhost:${port}`
        const originalSpecVersionUrl = updateTypegenFile(newSpecVersionUrl)

        const server = await startServer()

        try {
            await runTypegenCommand()
        } catch (error) {
            console.error(`Error running typegen command: ${error.message}`)
        } finally {
            revertTypegenFile(originalSpecVersionUrl)
            console.log('Shutting down server...')
            server.close(() => {
                process.exit(0)
            })
        }
    } catch (error) {
        console.error(`Error running subwasm or typegen: ${error.message}`)
        process.exit(1)
    }
}

if (!runtime || !runtimeBinaryPath) {
    console.error(
        'Usage: sqd generate-types-from-runtime-binary <runtime_name> <path_to_runtime_binary>'
    )
    process.exit(1)
}

if (!allowedRuntimes.includes(runtime)) {
    console.error(
        `Invalid runtime name: ${runtime}. Must be one of ${allowedRuntimes.join(
            ', '
        )}`
    )
    process.exit(1)
}

run()
