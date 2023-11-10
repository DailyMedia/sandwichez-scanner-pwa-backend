const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/sumar-puntos/:pass_id', async (req, res) => {
    try {
        const passId = req.params.pass_id;
        const apiUrl = `https://sandwitchez-scanner-poc-backend.vercel.app/?campo=${passId}`;
        const apiKey = process.env.API_KEY;

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error en la llamada GET:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
