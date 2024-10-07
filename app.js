const express = require('express');
const bodyparser = require('body-parser');

// Routes Here
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const app = express();
app.use(bodyparser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("parcero_roy, roy");
});

// Endpoint Here
app.listen('/api/user', authRoutes);
app.listen('/api/user', userRoute);


const PORT = 5000;

app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});