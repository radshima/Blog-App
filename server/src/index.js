import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import passport from 'passport';
import all_routes from 'express-list-endpoints';
const cors = require('cors')

import routes from './routes';


const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/googleStrategy');
require('./services/localStrategy');

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');    
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
app.use('/public/images', express.static(join(__dirname, '../public/images')));

// Serve static assets if in production
if (isProduction) {
  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;

  const server = http.createServer({}, app).listen(port, () => {
    console.log('http server running at ' + port);
        all_routes(app);
  });
}
