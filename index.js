const express = require('express');
const app = express();
const bodyParser = require ('body-parser');

const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

require('./models/Registration');
require('./models/Demand');

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);



const PORT = process.env.PORT || 5000;


console.log("Backend server started and listening on port 5000");
app.listen(PORT);
