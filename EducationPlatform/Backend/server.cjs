// Hent server
const express = require('express')

// Opret server instance - app
const app = express()
const port = 5173

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})