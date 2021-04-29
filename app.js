const morgan = require('morgan');
const express = require('express');
const { db, Page, User } = require('./models');
const users=require('./routes/users');
const wiki=require('./routes/wiki');

morgan('dev');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.redirect('/wiki');
})
app.use('/wiki',wiki);
app.use('/users',users);
app.use((err, req, res, next)=>{
  console.error(err);
  res.sendStatus(400);
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


const PORT = 8008;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
