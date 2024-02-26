const express = require('express');
const dotenv = require('dotenv').config();
const _errorhandler = require('./middleware/ErrorHandle.js');
const connectDB = require('./config/connectionMngr.js');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(_errorhandler);

connectDB();

app.use('/api/task', require('./routes/taskRoute'));
app.use("/api/users", require("./routes/UserRoutes"));

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})