const express=require("express");
const app=express();
const errorMiddleware=require("./middleware/error");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");

//config
const dotenv=require("dotenv");
// dotenv.config({ path: "Back-end/config/config.env" });
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "Back-end/config/config.env" });
}


const path=require("path");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

//Route import
const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//MiddleWare for errors
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,'../frontend/build')));
app.get("*",(req,res)=>(
    res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
));


module.exports =app;


