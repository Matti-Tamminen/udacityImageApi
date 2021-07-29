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
    const files = fs.readdirSync(thumbpath)
    const isFile = files.includes(`${name}${width}x${height}.jpg`)

    return isFile
}

// using sharp to modify image
export const handleResize = async (
    name: string,
    width: string,
    height: string,
    res: any
) => {
    await sharp(path.join(filepath, `${name}.jpg`))
        .resize(parseInt(width), parseInt(height))
        .toFile(path.join(thumbpath, `${name}${width}x${height}.jpg`))
        .catch((err: Error) => {
            console.log(`Error from handleResize() in image loading: ${err}`)
            // res.writeHead(500, { 'Content-type': 'text/html' })
            // res.status(500).end('<h2>Something went wrong, check your path.<h2>')
            throw err
        })
}

// using filereader to return image
export const returnImage = (
    name: string,
    width: string,
    height: string,
    res: any
) => {
    fs.readFile(
        path.join(thumbpath, `${name}${width}x${height}.jpg`),
        (err: Error, img: File) => {
            if (err) {
                console.log(
                    `Error from returnImage() in returning image: ${err}`
                )
                // res.writeHead(500, { 'Content-type': 'text/html' })
                // res.status(500).end('<h2>Something went wrong, file read failed.<h2>')
                throw err
            } else {
                // res.writeHead(200, { 'Content-type': 'image/jpg' })
                res.status(200).end(img)
            }
        }
    )
}
