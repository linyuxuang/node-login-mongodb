var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//设置跨域访问
// app.all('*', function(req, res, next) {
//      res.header("Access-Control-Allow-Origin", "*");
//      res.header("Access-Control-Allow-Headers", "X-Requested-With");
//      res.header('Access-Control-Allow-Methods:POST, GET, OPTIONS');
//      res.header("X-Powered-By",' 3.2.1');
//      res.header("Content-Type", "application/json;charset=utf-8");
//      res.header("Access-Control-Allow-Credentials", "true")
//     //     Access-Control-Allow-Origin
//      next();
//   });
app.use(cors({
    origin:['http://localhost:8080'],  //指定接收的地址
    methods:['GET','POST'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(80,function(){
  console.log('服务已启动...')
})
module.exports = app;
