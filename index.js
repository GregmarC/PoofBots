const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({'hello': 'there'});
})


const PORT = process.env.PORT || 5000;


console.log("Server started and listening on port 5000");
app.listen(PORT);
