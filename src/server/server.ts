import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from "./routes";
import {connectDb} from "./db";

const app = express();

app.use('/user', userRoutes);

async function start(port: number | string) {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`App started on port ${port}`);
        });
    } catch(ex) {
        console.log('Error on starting application', ex);
    }
}

export { start };