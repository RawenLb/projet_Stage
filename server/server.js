import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

const app = express();
config();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use('/api', router);

app.get('/', (req, res) => {
    res.json("Server is up and running");
});

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.log("Database connection error:", error);
});
