const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CONN);
        console.log('Database Connected');
    } catch (error) {
        console.log('Error connecting to DB', error);
    }

}

module.exports = {
    dbConnection
}