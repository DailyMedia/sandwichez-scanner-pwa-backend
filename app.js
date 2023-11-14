const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/sumar-puntos/:pass_id', async (req, res) => {
    try {
        const passUid = req.params.pass_id;
        const apiUrl = `https://app.passcreator.com/api/pass/${passUid}?zapierStyle=true`;
        const apiKey = process.env.API_KEY;
        const storedValue = Math.floor(Math.random() * 8) + 1;
        console.info(storedValue);
        const data = {
            storedValue: storedValue
        };

        const response = await axios.post(apiUrl, data, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
        });
        console.info(response.status);
        console.info(response.data);
        // Devuelve el código de estado y el cuerpo de la respuesta
        res.status(response.status).json({
            statusCode: response.status,
            body: response.data
        });
    } catch (error) {
        console.error('Error en la llamada POST:', error.message);
        // Devuelve un código de estado 500 y un mensaje de error
        res.status(500).json({
            statusCode: 500,
            body: 'Error interno del servidor'
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
