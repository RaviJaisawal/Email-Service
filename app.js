var express = require('express')
var bodyparser = require('body-parser')
var sendgrid = require('./module/sendgrid')

var app =  express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req,res,next){

  res.render('index');

})


app.post('/', function(req,res,next){    
      var email =  req.body.email;
      var content =  req.body.content;
      var subject =  req.body.subject;

  if(email !== '' && content !== '' && subject !== ''){
     sendgrid.sendMail(email,subject,content)
  }
  else{
    res.send("Please Provide the require Input")
  }   
  res.send(req.body)
})


app.listen(3000,function(){
  console.log('server is listen on port 3000');
})






