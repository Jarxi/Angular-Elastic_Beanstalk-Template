
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const {
//   authRoute,
//   columnRoute,
//   userRoute,
//   postRoute,
//   uploadRoute
// } = require('./api/routes');
require('dotenv').config();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors middleware for origin and Headers
app.use(cors());

// Set Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

//Use Routes
// app.use("/api/user", userRoutes);
// app.use('/api/auth', authRoute);
// app.use('/api/column', columnRoute);
// app.use('/api/user', userRoute);
// app.use('/api/post', postRoute);
// app.use('/api/upload', uploadRoute);


// Invalid routes handling middleware
app.use((error, req, res, next) => {
  console.log(req);
  const newError = new Error('404 not found '+ error.message);
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//server statuc assets if in production
if (process.env.NODE_ENV !== 'development') {
  const root = path.join(__dirname,'dist');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile('index.html', root);
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
