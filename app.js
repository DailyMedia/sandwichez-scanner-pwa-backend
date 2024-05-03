const express = require('express');
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.get('/sumar-puntos/:pass_id', async (req, res) => {
    try {
        const passUid = req.params.pass_id;
        const apiUrl = `https://app.passcreator.com/api/pass/${passUid}?zapierStyle=true`;
        const apiKey = process.env.API_KEY;
        const maxValue = 10;

        //busca el pass en la API de PassCreator
        const response1 = await axios.get(apiUrl, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
        })

        const response1Data = JSON.parse(JSON.stringify(response1.data))
        let storedValue = response1Data.storedValue;
        let answer
        console.log('storedValue: ' + storedValue);
        storedValue++

        //comprueba si ya lleva 10 cafes
        if(storedValue === 10) {
            answer = {
                msg: `Éste es tu café ${storedValue} de ${maxValue}. ¡Te lo llevas gratis!`,
                countdown: 10
            }
            storedValue = 0
        } else {
            answer = {
                msg: `Llevas ${storedValue} cafés de ${maxValue}. ¡Ya queda menos para tu café gratis!`,
                countdown: 5
            }
        }

        console.log(answer)
        const data = {
            storedValue: storedValue
        };

        //actualiza el pass en PassCreator
        const response2 = await axios.post(apiUrl, data, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
        })

        // Devuelve el código de estado y el cuerpo de la respuesta
        res.json({
            statusCode: response2.status,
            body: response1Data,
            answer: answer
        });
    } catch (error) {
        console.error('Error en la llamada POST:', error.message);
        console.log(error.message)
        // Devuelve un código de estado 500 y un mensaje de error
        res.json({
            statusCode: 500,
            body: 'Error interno del servidor'
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
