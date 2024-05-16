import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { normalizeFilters } from '../utilities/normalization';
import { onStart, getTableSectionData, getGroupedEducations, getEducationProperties } from './on-server-start';
import { MinimumMaximum, UserImputs, TableFilters, QuizAnswers } from '../../src/types';
import { Ranker } from "../utilities/ranking";
import bodyParser from 'body-parser'; // Import the bodyParser package

const server: Express = express();

const PORT = 1337;


onStart();
server.use(cors()); // Enable CORS
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb' }));


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
server.get("/get_grouped_educations", (request: Request, response: Response) => {
    response.status(200).send(getGroupedEducations());
});
server.get("/get_education_properties", (request: Request, response: Response) => {
    response.status(200).send(getEducationProperties());
});


server.post("/update_ranking", (request: Request, response: Response) => {
    try {
        const requestData = request.body;
        const filters: TableFilters = requestData.filterProps;
        const quizAnswers: QuizAnswers = requestData.quizAnswers;

        const userInput: UserImputs = {
            quizAnswers: quizAnswers,
            filters: normalizeFilters(filters),
        };
        console.log("filters", userInput.filters)
        const ranker = new Ranker();
        const ranking = ranker.produceRanking(userInput);
        console.log("ranking", ranking)

        response.status(200).send(ranking); // Ensure JSON response
    } catch (error) {
        console.error("Error in /update_ranking:", error);
        response.status(500).json({ error: "Internal Server Error" }); // Send JSON error
    }
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
