const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', async (req, res, next) => {
    try {
      // …and then await any non‑blocking calls
      const [users, stats] = await Promise.all([
        db.fetchActiveUsers(),            // returns a Promise
        analyticsService.getSiteMetrics() // returns a Promise
      ]); 

      // this submits all the data of the users to the database
      res.json({ users, stats });
    } catch (err) {
      // pass errors to Express’s error handler
      next(err);
    }
  });