const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/sumar-puntos/:passUid', async (req, res) => {
    try {
        const passUid = req.params.passUid;
        const apiUrl = `https://app.passcreator.com/api/pass/${passUid}?zapierStyle=true`;
        const apiKey = process.env.API_KEY;

        const response = await axios.post(apiUrl, req.body, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error en la llamada POST:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
