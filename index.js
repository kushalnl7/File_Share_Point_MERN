const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}, 
(err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});
const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
}));
app.use(express.static('public'));


app.use("/auth", require("./routers/userRouter"));  
app.use("/api/files", require("./routers/filesRouter"));  
app.use("/files", require("./routers/showRouter"));  
app.use("/list", require("./routers/listRouter"));   
app.use("/team", require("./routers/teamRouter"));   

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));