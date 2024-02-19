const express = require('express');
const app = express();
const port = 3000;

const mindee = require("mindee");
// Init a new client
const mindeeClient = new mindee.Client({apiKey: "0f2b71e7ac29ddb53baec9df3b6948d5"});

app.use(express.json({ limit: '50mb' })); // For JSON payloads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded payloads

app.get('/', (req, res) => {
    res.send('Welcome to the RESTful API Tutoria!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

app.post('/mindee', (req, res) => {
    console.log('Uploadind document', req?.body);

// Load a file from disk
    const inputSource = mindeeClient.docFromBase64(req.body.content.bytes, req.body.filename);

// Parse it on the API of your choice
    const apiResponse = mindeeClient.parse(
        mindee.product.PassportV1,
        inputSource
    );

    // Handle the response Promise
    apiResponse.then((resp) => {
        // print a string summary
        console.log(resp.document.toString());
        res.send(resp.document)
    });


});