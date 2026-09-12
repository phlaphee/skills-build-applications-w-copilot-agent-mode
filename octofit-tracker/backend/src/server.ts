import express from 'express';
import connectToDatabase from './config/database.js';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', async (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend', apiBaseUrl: baseUrl });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find({}).lean();
  response.json({ apiBaseUrl: baseUrl, count: users.length, results: users });
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find({}).lean();
  response.json({ apiBaseUrl: baseUrl, count: teams.length, results: teams });
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find({}).lean();
  response.json({ apiBaseUrl: baseUrl, count: activities.length, results: activities });
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  response.json({ apiBaseUrl: baseUrl, count: leaderboard.length, results: leaderboard });
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find({}).lean();
  response.json({ apiBaseUrl: baseUrl, count: workouts.length, results: workouts });
});

const startServer = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
};

startServer();