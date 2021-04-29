//setup router
const express=require('express');
const router=express.Router();
module.exports=router;

//include database
const { db, Page, User } = require('../models');
//use addPage and wikiPage and index
const addPage=require('../views/addPage')
const wikiPage=require('../views/wikipage')
const mainPage=require('../views/main')

router.get('/',async(req,res,next)=>{
    try{const data=await Page.findAll();
    res.send(mainPage(data));}
    catch(error){
        next(error);
    }
})
router.post('/',async(req,res,next)=>{
    try {
    const content = req.body.content;
    console.log('this is a body!>>>>',req.body);
    const title=req.body.title;
    const newPage=await Page.create({content:content, title:title});
    res.redirect(`/wiki/${newPage.slug}`);
} catch (error) {
    next(error);
}
})
router.get('/add',async(req,res,next)=>{
    res.send(addPage());
})
router.get('/:slug', async (req, res, next) => {
    try{const data=await Page.findOne({where:{slug:req.params.slug}});
    res.send(wikiPage(data));}
    catch(error){
        next(error);
    }
  });