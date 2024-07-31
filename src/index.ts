import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import morgan from 'morgan';
import { router } from './router/router';


const app = express();
app.use(express.json())
app.use('/api', router)
app.use(morgan('dev'))

const port = process.env.PORT || 2100;


app.listen(port, () => console.log(`Server on http://localhost:${port}`))