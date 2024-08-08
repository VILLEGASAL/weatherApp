import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


let data;
let errorMessage;
const APIKEY = process.env.API_KEY;

app.get("/", (req, res) => {

    res.status(200).render("index.ejs", {

        content: data,
        error: errorMessage
    });
});

app.post("/", async(req, res) => {

    try {
        
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&appid=${APIKEY}`)

        data = response.data;
        
        res.status(200).redirect("/");

    } catch (error) {
        
        data = error.response.data

        res.redirect("/")
    }
});


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}...`);
    
});