const express = require("express");
const mongoose = require('mongoose')
const app = express();
const cookieParser = require('cookie-parser');
const apiRoutes = require('./src/routes/index');
const db = `mongodb://localhost:27017/devString`;
(async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(`Error! Connecting to MongoDB ${err}`);
  }
})();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
  // res.header('Last-Modified', new Date().toUTCString());
  if (req.method === 'OPTIONS') {
    return res.status(200).send({})
  }
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/uploads', express.static('uploads'))
app.get("/", (req, res) => {
  res.send(" WELL COME HOME PAGE")
});
app.use('/api', apiRoutes)
app.listen(8000, () => {
  console.log('server running at 8000')
})