const express = require('express')
const resize = require('./api/resize')

const routes = express.Router()

routes.get('/', (req: any, res: any) => {
    res.status(200).send(
        `<h1>Resize images</h1>
        <p>To request an image resize, navigate to /resize and apply parameters:</p>
        <ul>
        <li>name - image name without type</li>
        <li>width - image width numbers</li>
        <li>height - image height numbers</li>
        </ul>`
    )
})

routes.use('/resize', resize)

export = routes
