const connectToMongo = require('./db'); 
const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");

connectToMongo();

const app = express()
const port = 5000

app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST","PUT","DELETE"]
}));
app.use(express.json())
app.use(bodyParser.json());



app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}`)
})
