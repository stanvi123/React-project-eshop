const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const uri = "mongodb+srv://tech_123:tech_123@cluster0.blzqrlm.mongodb.net/esho"
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Apply authJwt middleware before error handling
// app.use(authJwt());

// Serve static files
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Apply errorHandler middleware
// app.use(errorHandler);

// Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);



async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error while connecting" + error.message);
    }
}
connectDB()

// Server
app.listen(3000, () => {
    console.log('Server is running http://localhost:3000');
})


