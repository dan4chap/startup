const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('easy-expenses');
const userCollection = db.collection('user');
const goalCollection = db.collection('goals');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
} catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
}
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addGoal(goal) {
    return goalCollection.insertOne(goal);
}

function getGoals(email) {
    return goalCollection.find({ email: email });
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addScore,
    getHighScores,
};
