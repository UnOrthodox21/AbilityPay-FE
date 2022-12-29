const history = require('connect-history-api-fallback')
const express = require('express')
const path = require('path')

const app = express()
const staticFileMiddleqware = express.static(path.join(__dirname, 'dist'))

app.use(history())
app.use(staticFileMiddleqware)

app.get('/', function (req, res) {
    res.render(path.join(dirname + '/index.html'))
})

var port = process.env.PORT || 9091
app.listen(port, function() {
    console.log("Express serving on " + port + "!");
})
