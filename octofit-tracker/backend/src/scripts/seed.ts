import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@example.com', role: 'coach', team: 'Alpha', workoutsCompleted: 12 },
      { name: 'Grace Hopper', email: 'grace@example.com', role: 'member', team: 'Alpha', workoutsCompleted: 9 },
      { name: 'Linus Torvalds', email: 'linus@example.com', role: 'member', team: 'Beta', workoutsCompleted: 11 },
    ]);

    const teams = await Team.insertMany([
      { name: 'Alpha', members: 2, wins: 8 },
      { name: 'Beta', members: 1, wins: 5 },
    ]);

    await Activity.insertMany([
      { user: users[0].name, type: 'run', distanceKm: 5.2, date: '2026-09-12' },
      { user: users[1].name, type: 'cycle', distanceKm: 18.7, date: '2026-09-12' },
      { user: users[2].name, type: 'strength', distanceKm: 0, date: '2026-09-13' },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, name: users[0].name, points: 1450 },
      { rank: 2, name: users[1].name, points: 1325 },
      { rank: 3, name: users[2].name, points: 1180 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Power', category: 'cardio', durationMinutes: 30 },
      { title: 'Strength Circuit', category: 'strength', durationMinutes: 40 },
      { title: 'Recovery Mobility', category: 'mobility', durationMinutes: 20 },
    ]);

    console.log(`Seeded ${teams.length} teams and ${users.length} users into octofit_db`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
