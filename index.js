// Load in our Express framework
const express       = require(`express`);
const bodyparser    = require('body-parser');

// Create a new Express instance called "app"
const app           = express()

//handle file uploads
const fileUpload = require("express-fileupload");
app.use(fileUpload());
//accept url encoded data
app.use(express.urlencoded({extended: true}));



// Load in our RESTful routers
const planetRouter  = require(`./routers/planet.js`)
const starRouter    = require(`./routers/star.js`)
const galaxyRouter  = require(`./routers/galaxy.js`)
const imageRouter   = require(`./routers/image.js`)
const { ServerError, NotFoundError } = require("./errors.js")

app.set("views", __dirname + '/views');
app.set("view engine", "twig");

app.use(express.static(__dirname + "/public"));
// Home page
app.get('/', (req, res) => {
  res.render("home/index");
});

// Register our RESTful routers with our "app"
app.use(`/planets`,  planetRouter)
app.use(`/stars`,    starRouter)
app.use(`/galaxies`, galaxyRouter)
app.use(`/images`, imageRouter)
//Setup error handling

//Not found error handling
app.use((req, res, next) => next(new NotFoundError()));

//General error handling
app.use((e, req, res, next) => {
  console.log(e);
  return res.status(e.status ?? 500).json(e);
})
// Set our app to listen on port 3000
app.listen(3000)
