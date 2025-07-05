const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'src', 'data.json');

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Define a route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Define a route to serve chat.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'admin.html'));
});

// POST endpoint to save form data
app.post('/submit-data', (req, res) => {
    const newData = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        let existingData = [];
        if (!err) {
            try {
                existingData = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing data.json:', parseErr);
                // If parsing fails, start with an empty array to prevent data corruption
                existingData = []; 
            }
        } else if (err.code !== 'ENOENT') {
            // If error is not 'file not found', then it's a real error
            console.error('Error reading data.json:', err);
            return res.status(500).send('Error reading data file.');
        }

        existingData.push(newData);

        fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to data.json:', writeErr);
                return res.status(500).send('Error saving data.');
            }
            res.status(200).send('Data saved successfully!');
        });
    });
});

// New POST endpoint to proxy data to the external webhook
app.post('/send-to-webhook', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return res.status(500).send('Error reading data file.');
        }

        const jsonData = JSON.parse(data);
        const webhookUrl = 'http://localhost:5678/webhook-test/7ada7183-0f68-4a5c-bf90-77bc92515ff4';

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(webhookResponse => {
            res.status(200).send('Data sent to webhook successfully: ' + webhookResponse);
        })
        .catch(error => {
            console.error('Error sending data to webhook:', error);
            res.status(500).send('Failed to send data to webhook: ' + error.message);
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
