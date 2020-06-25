import { start } from './server/server';

const port =  process.env.PORT || 4301;

start(port).catch((ex) => {
    console.error(ex);
});
