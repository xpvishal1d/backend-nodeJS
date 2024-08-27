const mongoose = require('mongoose');

// MongoDB URI
const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connected to server");
});

db.on('error', (err) => {
    console.log("MongoDB NOT connected to server" );
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected from server");
});

// Export db connection
module.exports = db;
