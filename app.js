var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fileUpload=require('express-fileupload')
var logger = require('morgan');
const hbs = require('express-handlebars')
var session = require('cookie-session')

if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const db =require('./config/connection')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var pagesRouter = require('./routes/pages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//default layout setup
app.engine('hbs', hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts/',partialsDir:__dirname+'/views/partials/'}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(session({secret:"Key",resave: true,
saveUninitialized: true,cookie:{maxAge:600000}}))

db.connect(function (err){
  if (err) console.log("Connection Error");
  else console.log("Connection Established");
})

app.use('/', indexRouter);
app.use('/user',userRouter)
app.use('/admin',adminRouter);
app.use('/pages',pagesRouter)

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
