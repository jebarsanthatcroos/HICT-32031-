const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');

const sampleTasks = [
    { text: 'Sample Task 1' },
    { text: 'Sample Task 2' },
    { text: 'Sample Task 3' },
];

async function seedTasks() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        await Task.deleteMany({});
        console.log('Existing tasks cleared');
        await Task.insertMany(sampleTasks);
        console.log('Tasks seeded successfully');
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedTasks();