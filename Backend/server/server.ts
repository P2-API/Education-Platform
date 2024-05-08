import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { onStart, getTableSectionData } from './on-server-start';
import { MinimumMaximum } from '../../src/types';

const server: Express = express();

const PORT = 1337;


onStart();

server.use(cors()); // Enable CORS

server.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello Worlds");
});

server.get("/server", (request: Request, response: Response) => {
    response.status(200).send("Hello from the server!");
});

server.get("/get_table_section_data", (request: Request, response: Response) => {
    response.status(200).send(getTableSectionData());
});

server.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
