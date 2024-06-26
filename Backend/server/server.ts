import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { normalizeFilters } from '../utilities/normalization';
import { onStart, getTableSectionData, getGroupedEducations, getEducationProperties, getNormalizedEducations } from './on-server-start';
import { UserInputs, TableFilters, QuizAnswers } from '../../src/types';
import { Ranker } from "../utilities/ranking";
import { performPCA } from "../utilities/pca";
import { getHeadliner, getPersonalizedMessage } from '../utilities/web_scraper';

const server: Express = express();
const PORT = 3222;
const pathToDist = path.join(__dirname, '../../dist');
onStart();
server.use(cors()); // Enable CORS
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb' }));
server.use(express.static(pathToDist)); // Serve static files from the 'dist' folder
// Serve index.html on the root route


server.get("/node2", (_request: Request, response: Response) => {
    response.sendFile(path.join(pathToDist, 'index.html'));
});

server.get("/node2/server", (_request: Request, response: Response) => {
    response.status(200).send("Hello from the server!");
});

server.get("/node2/get_table_section_data", (_request: Request, response: Response) => {
    response.send(getTableSectionData());
});

server.post("/node2/PCA_request", (request: Request, response: Response) => {
    const requestData: UserInputs = request.body;
    const pcaData = performPCA(requestData);
    response.send(pcaData);
});

server.get("/node2/get_grouped_educations", (_request: Request, response: Response) => {
    response.send(getGroupedEducations());
});

server.get("/node2/get_education_properties", (_request: Request, response: Response) => {
    response.send(getEducationProperties());
});

server.get("/node2/get_normalized_educations", (_request: Request, response: Response) => {
    response.send(getNormalizedEducations());
});

server.post("/node2/update_ranking", (request: Request, response: Response) => {
    try {
        const requestData = request.body;
        const filters: TableFilters = requestData.filterProps;
        const quizAnswers: QuizAnswers = requestData.quizAnswers;

        const userInput: UserInputs = {
            quizAnswers: quizAnswers,
            filters: normalizeFilters(filters),
        };
        const ranker = new Ranker();
        const ranking = ranker.produceRanking(userInput);

        response.status(200).send(ranking); // Ensure JSON response
    } catch (error) {
        console.error("Error in /update_ranking:", error);
        response.status(500).json({ error: "Internal Server Error" }); // Send JSON error
    }
});

server.post("/node2/generate_personalized_message", (request: Request, response: Response) => {
    const requestData = request.body;
    const quizAnswers = requestData.quizAnswers;
    const filters = requestData.filters;
    const education = requestData.education;
    const doesPassFilters = requestData.doesPassFilters;

    let personalizedMessage;
    getPersonalizedMessage(filters, quizAnswers, education, doesPassFilters).then((text) => {
        personalizedMessage = text;
        response.status(200).send(personalizedMessage);
    }
    ).catch((error) => {
        console.error("Error in /generate_personalized_message:", error);
        response.status(500).json({ error: "Internal Server Error" }); // Send JSON error
    });
});

server.post("/node2/get_small_text_about_education", (request: Request, response: Response) => {
    const requestData = request.body;
    const education = requestData.education;

    let smallText;
    getHeadliner(education.url).then((text) => {
        smallText = text;
        response.status(200).send(smallText.headlinerText);
    }
    ).catch((error) => {
        console.error("Error in /get_small_text_about_education:", error);
        response.status(500).json({ error: "Internal Server Error" }); // Send JSON error
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on https://cs-24-dat-2-02.p2datsw.cs.aau.dk/node2/ ...`);
}).on("error", (error) => {
    throw new Error(error.message);
});
