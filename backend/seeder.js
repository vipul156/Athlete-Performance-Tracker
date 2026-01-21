const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Athlete = require('./models/Athlete');
const Test = require('./models/Test');
const Score = require('./models/Score');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // 1. Clear existing data
        await Score.deleteMany();
        await Athlete.deleteMany();
        await User.deleteMany();
        await Test.deleteMany();

        console.log('Data Destroyed...');

        // 2. Create Coach
        const coach = await User.create({
            name: 'Coach Carter',
            email: 'coach@example.com',
            password: 'password123',
            role: 'coach',
        });

        const viewer = await User.create({
            name: 'Viewer User',
            email: 'viewer@example.com',
            password: 'password123',
            role: 'viewer',
        });

        console.log('Coach created...');

        // 3. Create Tests
        const tests = await Test.insertMany([
            { name: '30m Sprint', unit: 's', type: 'lower_is_better', min_standard: 3.5, max_standard: 6.0 },
            // Sprint: 3.5s is 100pts, 6.0s is 0pts
            { name: 'Vertical Jump', unit: 'cm', type: 'higher_is_better', min_standard: 30, max_standard: 125 },
            // VJump: 30cm is 0pts, 125cm is 100pts
            { name: 'Broad Jump', unit: 'cm', type: 'higher_is_better', min_standard: 150, max_standard: 350 },
            { name: 'Bench Press 1RM', unit: 'kg', type: 'higher_is_better', min_standard: 20, max_standard: 200 }
        ]);

        console.log('Tests created...');

        // 4. Create Athletes
        const athletes = await Athlete.insertMany([
            {
                name: 'Michael Jordan',
                dob: new Date('1963-02-17'),
                height: 198,
                weight: 98,
                created_by: coach._id,
            },
            {
                name: 'LeBron James',
                dob: new Date('1984-12-30'),
                height: 206,
                weight: 113,
                created_by: coach._id,
            },
            {
                name: 'Usain Bolt',
                dob: new Date('1986-08-21'),
                height: 195,
                weight: 94,
                created_by: coach._id,
            },
            {
                name: 'Serena Williams',
                dob: new Date('1981-09-26'),
                height: 175,
                weight: 72,
                created_by: coach._id,
            }
        ]);

        console.log('Athletes created...');

        // 5. Create Scores
        // Helper to find test by name
        const getTest = (name) => tests.find(t => t.name === name)._id;
        const getAthlete = (name) => athletes.find(a => a.name === name)._id;

        const scores = [
            // MJ
            { athlete_id: getAthlete('Michael Jordan'), test_id: getTest('Vertical Jump'), value: 122, recorded_by: coach._id },
            { athlete_id: getAthlete('Michael Jordan'), test_id: getTest('Broad Jump'), value: 310, recorded_by: coach._id },
            { athlete_id: getAthlete('Michael Jordan'), test_id: getTest('30m Sprint'), value: 3.9, recorded_by: coach._id },

            // LeBron
            { athlete_id: getAthlete('LeBron James'), test_id: getTest('Vertical Jump'), value: 112, recorded_by: coach._id },
            { athlete_id: getAthlete('LeBron James'), test_id: getTest('Bench Press 1RM'), value: 190, recorded_by: coach._id },
            { athlete_id: getAthlete('LeBron James'), test_id: getTest('30m Sprint'), value: 4.1, recorded_by: coach._id },

            // Bolt
            { athlete_id: getAthlete('Usain Bolt'), test_id: getTest('30m Sprint'), value: 3.5, recorded_by: coach._id },
            { athlete_id: getAthlete('Usain Bolt'), test_id: getTest('Broad Jump'), value: 320, recorded_by: coach._id },
            { athlete_id: getAthlete('Usain Bolt'), test_id: getTest('Vertical Jump'), value: 105, recorded_by: coach._id },

            // Serena
            { athlete_id: getAthlete('Serena Williams'), test_id: getTest('Vertical Jump'), value: 85, recorded_by: coach._id },
            { athlete_id: getAthlete('Serena Williams'), test_id: getTest('30m Sprint'), value: 4.3, recorded_by: coach._id },
            { athlete_id: getAthlete('Serena Williams'), test_id: getTest('Bench Press 1RM'), value: 95, recorded_by: coach._id },
        ];

        await Score.insertMany(scores);

        console.log('Scores created...');
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
