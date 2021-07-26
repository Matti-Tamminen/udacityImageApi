const express = require('express')
const resize = require('./api/resize')

const routes = express.Router()

routes.get('/', (req: any, res: any) => {
    res.status(200).send(
        '<h1>Resize images</h1><p>To request an image resize, navigate to /resize and apply parameters.</p>'
    )
})

routes.use('/resize', resize)

export = routes
