var express = require('express');
var app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

