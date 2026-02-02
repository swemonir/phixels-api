import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const port = config.PORT || 5001;

async function main() {
    try {
        await mongoose.connect(config.MONGO_URL as string);
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Not connected to MongoDB', err);
    }
}

main();