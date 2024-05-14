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

    // calculate PCA function here: 
    // const PCA_data = calculatePCA(requestData);

    // return the result below
    response.status(200).send("PCA_data received: " + JSON.stringify(requestData));
});

server.post("/update_ranking", (request: Request, response: Response) => {
    const requestData = request.body;
    const filterProps = requestData.filterProps;
    const quizAnswers = requestData.quizAnswers;

    // calculate ranking function here: 
    // const rankings = calculateRanking(filterProps, quizAnswers);

    // return the result below
    //response.status(200).send(rankings);
    response.status(200).send(JSON.stringify(requestData));
});

server.post("generate_personalized_message", (request: Request, response: Response) => {
    const requestData = request.body;
    const quizAnswers = requestData.quizAnswers;
    const filters = requestData.filters;

    // calculate personalized message function here: 
    // const personalizedMessage = calculatePersonalizedMessage(quizAnswers, filters);

    // return the result below
    //response.status(200).send(personalizedMessage);
    response.status(200).send(JSON.stringify(requestData));
});


server.listen(PORT, () => {
}).on("error", (error) => {
    throw new Error(error.message);
});
