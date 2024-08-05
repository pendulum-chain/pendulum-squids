const express = require('express')
const fs = require('fs')
const axios = require('axios')

const app = express()
const port = 3000
const metadataFile = './local-archive-endpoint/runtime.metadata'
const archiveURL = 'https://v2.archive.subsquid.io/metadata/foucoco'

function readLocalMetadata() {
    const localMetadataContent = fs.readFileSync(metadataFile, 'utf-8')
    return localMetadataContent.trim()
}

app.get('/', async (req, res) => {
    try {
        // Fetch the original metadata from the archive
        const response = await axios.get(archiveURL)
        const metadata = response.data

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

        const newSpecVersion = specVersion + 1

        const localRuntimeMetadata = readLocalMetadata()
        const customMetadata = {
            blockNumber: 0,
            blockHash: '0x0000',
            specName: 'foucoco',
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

        res.send(combinedMetadataString)
    } catch (error) {
        console.error(
            `Error fetching metadata from local archive endpoint: ${error.message}`
        )
        res.status(500).send(
            'Error fetching metadata from local archive endpoint'
        )
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
