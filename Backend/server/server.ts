import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { Education } from "../../src/types"
import { GetCSVFromURL, importCSV } from '../utilities/csv_importer';

const server: Express = express();

const PORT = 1337;

await GetCSVFromURL();
export const educations: Education[] = importCSV();



server.use(cors()); // Enable CORS

server.get("/", (request: Request, response: Response) => { 
    response.status(200).send("Hello Worlds");
}); 

server.get("/server", (request: Request, response: Response) => {
    response.status(200).send("Hello from the server!");
});

server.get("/get_educations", (request: Request, response: Response) =>{
    
})

server.listen(PORT, () => { 
    console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
    throw new Error(error.message);
});
