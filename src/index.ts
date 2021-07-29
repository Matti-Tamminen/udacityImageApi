const express = require('express')
const routes = require('../src/routes/main')

const app = express()
const PORT = 3000

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
