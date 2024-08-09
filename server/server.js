import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';


/** import connection file */
import connect from './database/conn.js';

const app = express()
config();


/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


/** appliation port */
const port = process.env.PORT || 8080;
// Route POST pour /api/feedback
app.post('/api/feedback', (req, res) => {
    const feedback = req.body; // Récupère les données du corps de la requête
    console.log('Feedback reçu:', feedback); // Affiche les données dans la console
    res.status(200).send('Feedback reçu'); // Répond avec un message de confirmation
  });

/** routes */
app.use('/api', router) /** apis */


app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})


/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})