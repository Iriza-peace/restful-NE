
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import express from 'express';	
import userRoutes from './routes/user.routes.js'
import booksRoutes from './routes/book.routes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument  from '../swagger.json' assert { type: "json" };



// Load environment variables
config({ path: './.env' });
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/users', userRoutes);
app.use('/books', booksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//here is the swagger documentation url " http://localhost:4000/api-docs/ 

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});


const port = process.env.PORT || 4000;

// Connect to the database

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Connected to database successfully');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


//console the JWT
export default sequelize;





