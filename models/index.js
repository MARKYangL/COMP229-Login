let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Yang:liyang@cluster0.au22z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log("Connected to MongoDB...");
});

const models = {
    users: require("./users"),
}

module.exports = models