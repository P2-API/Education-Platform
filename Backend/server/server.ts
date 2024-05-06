import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const server: Express = express();

const PORT = 1337;

server.use(cors()); // Enable CORS

server.get("/", (request: Request, response: Response) => { 
    response.status(200).send("Hello Worlds");
}); 

server.get("/server", (request: Request, response: Response) => {
    response.status(200).send("Hello from the server!");
});

server.listen(PORT, () => { 
    console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
    throw new Error(error.message);
});
