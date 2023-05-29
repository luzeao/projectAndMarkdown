var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// restful
var porApiRouter = require('./api/pro')
var userApiRouter = require('./api/user')
var cartApiRouter = require('./api/cart');
var addressApiRouter = require('./api/Address');
var orderApiRouter = require('./api/order');
var bannerApiRouter = require('./api/banner');
var cityApiRouter = require('./api/city');
// admin
var bannerAdminRouter = require('./admin/banner')
var statisticAdminRouter = require('./admin/statistic')
var proAdminRouter = require('./admin/pro')
var adminAdminRouter = require('./admin/admin')
var userAdminRouter = require('./admin/user')
var cartAdminRouter = require('./admin/cart')
var addressAdminRouter = require('./admin/address')
var searchAdminRouter = require('./admin/search')
var orderAdminRouter = require('./admin/order')
var dataAdminRouter = require('./admin/data')
const { decode } = require('punycode');

var app = express();
// app.io = dataAdminRouter.io

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/out')));

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
//  // res.header("Access-Control-Allow-Origin","http://localhost:8081"); // 白名单
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型， content-type
  res.header("Access-Control-Allow-Headers","*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  next();
});

app.all('/api/cart/*', (req, res, next) => {
  const token = req.headers.token || req.query.token || req.body.token
  if (token) {
    jwt.verify(token, 'bk2007', (err, decoded) => {
      if (err) {
        res.send({
          code: '10119',
          message: 'token无效'
        })
      } else {
        req.decoded = decoded
        next() // 中间件
      }
    })
  } else {
    res.send({
      code: '10119',
      message: 'token无效'
    })
  }
})

app.use('/api/pro', porApiRouter)
app.use('/api/user', userApiRouter)
app.use('/api/cart', cartApiRouter)
app.use('/api/address', addressApiRouter)
app.use('/api/order', orderApiRouter)
app.use('/api/banner', bannerApiRouter)
app.use('/api/city', cityApiRouter)

app.all('/admin/*', (req, res, next) => {
    const token = req.headers.token || req.query.token || req.body.token

    console.log(req.url)
    if (req.url == '/admin/admin/login') {
      next()
    } else {
      if (token) {
        jwt.verify(token, '嗨购-admin', (err, decoded) => {
          if (err) {
            res.send({
              code: '10119',
              message: 'token无效'
            })
          } else {
            req.decoded = decoded
            next() // 中间件
          }
        })
      } else {
        res.send({
          code: '10119',
          message: 'token无效'
        })
      }
    } 
  })
// admin
app.use('/admin/banner', bannerAdminRouter)
app.use('/admin/statistic', statisticAdminRouter)
app.use('/admin/pro', proAdminRouter)
app.use('/admin/admin', adminAdminRouter)
app.use('/admin/user', userAdminRouter)
app.use('/admin/cart', cartAdminRouter)
app.use('/admin/address', addressAdminRouter)
app.use('/admin/search', searchAdminRouter)
app.use('/admin/order', orderAdminRouter)
app.use('/admin/data', dataAdminRouter)

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

module.exports = app;
