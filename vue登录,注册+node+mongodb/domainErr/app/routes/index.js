var express = require('express');
var router = express.Router();
var path=require('path')
var fs=require('fs')
var mongoose=require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/login',function(err){
    if(err){
      throw err
    }else{
      console.log("数据库连接成功")
    }
  })
// 定义骨架
  var schema=new mongoose.Schema({
    name:String,
    pass:String
  })
 //创建model
  var models=mongoose.model('user',schema,'user')
     //注册接口
     router.post('/2288',function(req,res){
          var name= req.body.name;
          var pass=req.body.pass;
          var list=new models();
          list.name=name;
          list.pass=pass;
          list.save(function(err){
               console.log('数据库存入成功')
          })
          res.send('0')   
     }),
  //登录接口
     router.get('/logins',function(req,res){
          var name=req.query.name;
          var pass=req.query.pass;
          models.find().exec(function(err,data){
               if(err){
                 throw err
               }else{
                    //客户端用户名，密码，对比数据库 有没此值
                    function loginSql(){
                     return data.some((key,index,arr)=>{
                        return  key.name==name&&key.pass==pass         
                         })
                    }  
               }
               if(loginSql()){
                    res.send('0')   
               }else{
                    res.send('1')    
               }
          })
     })

module.exports = router;
