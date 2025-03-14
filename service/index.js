const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();
const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let goals = []; // Initialize goals array

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    res.clearCookie(authCookieName);
    res.status(204).end();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Create a new user
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

// Find a user by field and value
async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

// Set authentication cookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Create a new goal
apiRouter.post('/goals', async (req, res) => {
    try {
      console.log('Received data:', req.body); // Log incoming data
      const { name, goal } = req.body;
  
      if (!name || !goal) {
        res.status(400).send({ msg: 'Name and goal are required' });
        return;
      }
  
      const newGoal = {
        id: uuid.v4(),
        name,
        goal,
        progress: 0,
      };
  
      goals.push(newGoal);
      res.send(newGoal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).send({ msg: 'Failed to create goal' });
    }
  });
  
  

// Get all goals
apiRouter.get('/goals', async (req, res) => {
  try {
    res.send(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).send({ msg: 'Failed to fetch goals' });
  }
});

// Update a goal
apiRouter.put('/goals/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const goal = goals.find((g) => g.id === id);
    if (!goal) {
      res.status(404).send({ msg: 'Goal not found' });
      return;
    }

    const { name, goalValue, progress } = req.body;
    if (name) goal.name = name;
    if (goalValue) goal.goal = goalValue;
    if (progress) goal.progress = progress;

    res.send(goal);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).send({ msg: 'Failed to update goal' });
  }
});

// Delete a goal
apiRouter.delete('/goals/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const index = goals.findIndex((g) => g.id === id);
      if (index === -1) {
        res.status(404).send({ msg: 'Goal not found' });
        return;
      }
  
      goals.splice(index, 1);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting goal:', error);
      res.status(500).send({ msg: 'Failed to delete goal' });
    }
  });
 

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
