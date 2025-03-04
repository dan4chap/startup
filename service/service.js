const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const app = express();
app.use(express.static('public'));

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
