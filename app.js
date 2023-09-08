const http = require('http');
const express = require('express');
const axios = require('axios');
const port = 9321;
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const server = http.createServer(app);


/*
* --> For : NSB IB reCaptcha validation
* --> Params : user generate token
* --> Response : validation response
*/
app.post('/nsb-ib/reCaptcha/validate', (req, res) => {
    const token = req.query.token;

    console.log('Token -->' + token)
    console.log('Secret Key -->' + process.env.NSB_IB_SECRET_KEY)

    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        baseURL: 'https://www.google.com',
        url: '/recaptcha/api/siteverify',
        params: {
            secret: process.env.NSB_IB_SECRET_KEY,
            response: token
        }
    }).then((response) => {
        res.send(response.data);
        console.log('Validation response for humam --> ' + response.data.success)
    }).catch((error) => {
        res.send('Error validating reCAPTCHA');
    });
});

app.listen(port, function (error) {
    if (error) {
        console.log("Server error --> " + error)
    } else {
        console.log("Server is listening on port --> " + port)
    }
})
