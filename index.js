//app.js
const port = 3000;
const express = require('express');
const path = require('path');
const app = express();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

// Route to render the form (GET /new)
app.get('/new', (req, res) => {
  res.render('form', {});
});

// Route to handle form submission (POST /new)
app.post('/new', (req, res) => {
  const messageText = req.body.author;
  const messageUser = req.body.message;

  // Add new message to messages array
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date()
  });

  // Redirect to the homepage to display the updated messages
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
