const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const History = require('./models/ClaimHistory');
const app = express();
const cors = require('cors');

async function  main() {
    try{
        await  mongoose.connect('mongodb+srv://rahulsannamathdev:Rahul5002@cluster0.qvx4ue7.mongodb.net/leaderBoard?retryWrites=true&w=majority&appName=Cluster0');
        console.log("database connected");
    }

    catch(err){
        console.log(err);
    }
}
main();



app.use(cors());
app.use(express.json());
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newUser = new User({ name: name.trim(), totalPoints: 0 });
    await newUser.save();
    // Log activity
    await History.create({
      userId: newUser._id,
      userName: newUser.name,
      points: 0,
      type: 'user_added',
      timestamp: new Date()
    });
    res.status(201).json(newUser);
});

// Claim random points for a user
app.post('/users/:id/claim', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += randomPoints;
    await user.save();
    // Log activity
    await History.create({
      userId: user._id,
      userName: user.name,
      points: randomPoints,
      type: 'points_claimed',
      timestamp: new Date()
    });
    res.json({ user, pointsAwarded: randomPoints });
});

// Get recent activity
app.get('/activity', async (req, res) => {
    const activities = await History.find({}).sort({ timestamp: -1 }).limit(10);
    res.json(activities);
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
