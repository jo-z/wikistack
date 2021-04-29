//setup router
const express=require('express');
const router=express.Router();
module.exports=router;

//include database
const { db, Page, User } = require('../models');
//use static
const addPage=require('../views/addPage')

router.get('/',async(req,res,next)=>{
    try{const data=await Page.findAll();
    res.send(data);}
    catch(error){
        next(error);
    }
})
router.post('/',async(req,res,next)=>{
    try {
    const content = req.body.content;
    console.log('this is a body!>>>>',req.body);
    const title=req.body.title;
    await Page.create({content:content, title:title});
    res.sendStatus(201);
} catch (error) {
    next(error);
}
})
router.get('/add',async(req,res,next)=>{
    res.send(addPage());
})
router.get('/:slug', (req, res, next) => {
    res.send(`hit dynamic route at ${req.params.slug}`);
  });