const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// root folder
const root = path.resolve('./')
// path to full sized images
const filepath = path.join(root, 'data', 'full')
// path to thumb sized images
const thumbpath = path.join(root, 'data', 'thumb')

// checks if the image exists
export const checkFile = (
    name: string,
    width: string,
    height: string
): Boolean => {
    try {
        const files = fs.readdirSync(thumbpath)
        const isFile = files.includes(`${name}${width}x${height}.jpg`)

        return isFile
    } catch (err) {
        err.name = 'fs'
        throw err
    }
}

// using sharp to modify image
export const handleResize = async (
    name: string,
    width: string,
    height: string
) => {
    await sharp(path.join(filepath, `${name}.jpg`))
        .resize(parseInt(width), parseInt(height))
        .toFile(path.join(thumbpath, `${name}${width}x${height}.jpg`))
        .catch((err: Error) => {
            err.name = 'sharp'
            throw err
        })
}

// using filereader to return image
export const returnImage = (name: string, width: string, height: string) => {
    try {
        const img = fs.readFileSync(
            path.join(thumbpath, `${name}${width}x${height}.jpg`)
        )

        return img
    } catch (err) {
        err.name = 'fs'
        throw err
    }
}
