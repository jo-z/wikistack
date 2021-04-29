const morgan = require('morgan');
const express = require('express'); 
const { db, Page, User } = require('./models');

morgan('dev');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.send('hello whirl');
})

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

  const sync = async function synchronize () {
    await Page.sync()
    await User.sync();
  }

  sync()
    

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
