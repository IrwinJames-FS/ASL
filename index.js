// Load in our Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()

//accept url encoded data
app.use(express.urlencoded({extended: true}));
// Load in our RESTful routers
const planetRouter  = require(`./routers/planet.js`)
const starRouter    = require(`./routers/star.js`)
const galaxyRouter  = require(`./routers/galaxy.js`)
const { ServerError, NotFoundError } = require("./errors.js")

// Home page
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Star Tracker Library')
});

// Register our RESTful routers with our "app"
app.use(`/planets`,  planetRouter)
app.use(`/stars`,    starRouter)
app.use(`/galaxies`, galaxyRouter)

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
