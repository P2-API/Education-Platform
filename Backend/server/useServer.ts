

const useServer = () => {


    const greetServer = async () => {
        const response = await fetch("http://localhost:1337/server");
        const data = await response.text();
        return data;
    }

    // write more functions here

    const updateRanking = async (someWeightStructure: string) => {
        // Do some fetching to the server ( the server runs the ranking algorithm and returns the result)
        // handle the result 
        console.log(someWeightStructure);
        // return the result
    }


    // write more functions here 
    // write more functions here 
    return { greetServer, updateRanking};
}

export { useServer };