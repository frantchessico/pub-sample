import express from 'express';
import morgan from 'morgan';
import { router } from './router/router';


const app = express();
app.use(express.json())
app.use('/api', router)
app.use(morgan('dev'))
const port = 2920;


app.listen(port, () => console.log(`Server on http://localhost:${port}`))