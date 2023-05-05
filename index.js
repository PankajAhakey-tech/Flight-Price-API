const express = require("express");
const axios = require("axios");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/flight-prices", async(req, res) => {
    const apiKey = "1663e6d83emsh46700c09d26198ap175871jsna2bd0cd95d9b";
    const source = req.query.source; // Get the source city from the query parameter
    const destination = req.query.destination; // Get the destination city from the query parameter
    const date = req.query.date; // Get the travel date from the query parameter

    const options = {
        method: "GET",
        // url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/IN/INR/en-US/${source}/${destination}/${date}`,
        url: `https://skyscanner50.p.rapidapi.com/api/v1/searchFlights/${source}/${destination}/${date}`,
        headers: {
            "X-RapidAPI-Key": apiKey,
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
        },
    };

    try {
        const response = await axios(options);
        const prices = response.data.Dates.OutboundDates[0].Price;
        res.status(200).json({
            message: `The cheapest flight from ${source} to ${destination} on ${date} is ${prices} INR.`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});