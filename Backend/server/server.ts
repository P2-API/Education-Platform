import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { onStart, getTableSectionData } from './on-server-start';
import { MinimumMaximum } from '../../src/types';

const server: Express = express();

const PORT = 1337;


onStart();

server.use(cors()); // Enable CORS
server.use(express.json()); // Add this line to parse JSON requests


server.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello Worlds");
});

server.get("/server", (request: Request, response: Response) => {
    response.status(200).send("Hello from the server!");
});

server.get("/get_table_section_data", (request: Request, response: Response) => {
    response.status(200).send(getTableSectionData());
});
server.post("/PCA_request", (request: Request, response: Response) => {
    const requestData = request.body;
    const data = requestData.PCA_request;
    ("PCA_request received: ", data);

    // calculate PCA function here: 
    // const PCA_data = calculatePCA(requestData);

    // return the result below
    response.status(200).send("PCA_data received: " + JSON.stringify(requestData));
});

server.listen(PORT, () => {
    ("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
