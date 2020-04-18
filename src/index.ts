import express, { Application} from 'express';
import indexRoutes from './routes/index';
const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Usar pug como motor de vistas
app.set('view engine', 'pug');
// Routes
app.use(indexRoutes);

app.listen(3000);
console.log('Server on port', 3000);