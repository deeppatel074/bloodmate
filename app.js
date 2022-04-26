const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))



app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    res.status(403).send("Not Logged In");
  }
  next();
});

app.use(async (req, res, next) => {
  let currentTimeStamp = new Date().toUTCString();
  let requestMethod = req.method;
  let requestRoute = req.originalUrl;
  let authenticated;
  if (req.session.user) {
    authenticated = "Authenticated User";
  } else {
    authenticated = "Non-Authenticated User "
  }
  let log = `[ ${currentTimeStamp} ] : ${requestMethod}  ${requestRoute} ( ${authenticated})`;
  console.log(log);
  next();

})




configRoutes(app);


app.listen(3000, () => {
  console.log('Yep this is working 🍺');
  console.log("We've now got a server 🦄");
  console.log('App listen on port: 3000 🍕');
  console.log('Server Url:  http://localhost:3000')
});