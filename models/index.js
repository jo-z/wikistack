const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

// const sequelize = new Sequelize('database', 'username', null, {
//   dialect: 'postgres'
// })


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull:false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull:false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});
Page.beforeValidate(page=>{
  page.slug=slugMaker(page.title);
})
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      isEmail:true
    }
  }
});
const slugMaker=function(title){
  let result=title;
  while(result.includes(' ')){
  result=result.replace(' ','_');
  }
  result=result.replace(/[\W_]+/g,"");
  return result;
}

module.exports = { db, Page, User };
