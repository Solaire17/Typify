const functions = require("firebase-functions");
const axios = require("axios")
const cors = require("cors")({ origin: true });
require("dotenv").config()

exports.getToken = functions.https.onCall(async (data, context) => {
    return await axios("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                btoa(
                    process.env.REACT_APP_CLIENT_ID +
                    ":" +
                    process.env.REACT_APP_CLIENT_SECRET
                ),
        },
        data: "grant_type=client_credentials",
    })
        .then((tokenResponse) => {
            return ({ data: tokenResponse.data.access_token });
        })
        .catch((error) => console.log(error));
})