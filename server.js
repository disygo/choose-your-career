const app = require('./app');
const http = require('http');
const { connectToJobQueue } = require('./utils/jobQueue');

// Start server
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect to job queue for AI processing
connectToJobQueue().then(() => {
  console.log('Connected to job queue');
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});