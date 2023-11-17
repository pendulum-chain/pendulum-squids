const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const directoryPath = path.join(__dirname, 'nabla-abi')

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err)
        return
    }

    files.forEach((file) => {
        if (path.extname(file) === '.json') {
            const fileNameWithoutExt = path.basename(file, '.json')
            const command = `npx squid-ink-typegen --abi nabla-abi/${file} --output src/abi/${fileNameWithoutExt}.ts`

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error}`)
                    return
                }
                if (stderr) {
                    console.error(`Error in command output: ${stderr}`)
                }
                console.log(`ABI file generated for ${fileNameWithoutExt}`)
            })
        }
    })
})
