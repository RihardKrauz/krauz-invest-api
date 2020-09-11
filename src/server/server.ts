import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from "./routes";
import {connectDb} from "./db";
import * as doNotDisturb from "@sindresorhus/do-not-disturb";

const app = express();

app.use('/user', userRoutes);

app.get('/test2', (req, res) => {
    const result = doNotDisturb.isEnabled();
    result.then((isDnd) => { res.send(isDnd); });
});

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
