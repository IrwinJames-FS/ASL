const express = require("express");
const morgan = require("morgan");
const router = require("./routes/router");

const app = express();

//app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.use((req, res, next) => {
	const err = new Error("Not Found!");
	err.status = 404;
	return next(err);
});

app.use((error, req, res, next)=>{
	return res.status(error.status ?? 500).send(error);
})
app.listen(8080, ()=>console.log("Server is up"));
