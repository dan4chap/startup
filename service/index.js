const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { WebSocketServer, WebSocket } = require('ws');

const authCookieName = 'token';

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
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Create a new user
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

// Find a user by field and value
async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
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
      const { name, goal, email } = req.body;
  
      if (!name || !goal) {
        res.status(400).send({ msg: 'Name and goal are required' });
        return;
      }
  
      const newGoal = {
        email,
        name,
        goal,
        progress: 0,
      };
      const goals = await DB.addGoal(newGoal);
  
      //goals.push(newGoal);
      res.send(newGoal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).send({ msg: 'Failed to create goal' });
    }
  });
  
  

// Get all goals
apiRouter.get('/goals', async (req, res) => {
  try {
    const goalsCursor = await DB.getGoals(req.query.email);
    const goals = await goalsCursor.toArray(); // Convert cursor to array
    res.send(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).send({ msg: 'Failed to fetch goals' });
  }
});

// Update a goal
apiRouter.put('/goals/:id', verifyAuth, async (req, res) => {
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
        const result = await DB.deleteGoal(id); // Use the deleteGoal method

        if (result.deletedCount === 0) {
            res.status(404).send({ msg: 'Goal not found' });
            return;
        }

        res.status(204).end(); // Successfully deleted
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


const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*
const server = app.listen(thing=3000, () => {
    console.log(`Listening on ${thing}`);
});
*/

// CREATE A WEBSOCKET SERVER

const socketServer = new WebSocketServer({ server});

socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
        socketServer.clients.forEach(function each(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
        });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
        socket.isAlive = true;
    });
    });

    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
    socketServer.clients.forEach(function each(client) {
        if (client.isAlive === false) return client.terminate();

        client.isAlive = false;
        client.ping();
    });
}, 10000);





// PLAID API SETUP
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const plaidConfig = require('./plConfig.json');

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Use 'development' or 'production' for live environments
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': plaidConfig.PLAID_CLIENT_ID,
      'PLAID-SECRET': plaidConfig.PLAID_SECRET,
    },
  },
  username: plaidConfig.PLAID_USERNAME,
  password: plaidConfig.PLAID_PASSWORD,
});

const plaidClient = new PlaidApi(configuration);

// Create a Link token
apiRouter.post('/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'yo', // Replace with a unique user ID
      },
      client_name: 'Your App Name',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating link token');
  }
});

// Exchange public token for access token
apiRouter.post('/exchange_public_token', async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exchanging public token');
  }
});

apiRouter.post('/get_transactions', async (req, res) => {
  const { access_token } = req.body;
  try {
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: '2023-01-01',
      end_date: '2023-12-31',
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transactions');
  }
});