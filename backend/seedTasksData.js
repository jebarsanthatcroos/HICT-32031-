const mongoose = require('mongoose');
require('dotenv').config();

const Task = require('./models/Task'); 

const sampleTasks = [
    {
        title: 'Sample Task 1',
        description: 'This is a sample task',
        status: 'pending',
    },
    {
        title: 'Sample Task 2',
        description: 'Another sample task',
        status: 'completed',
    },
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