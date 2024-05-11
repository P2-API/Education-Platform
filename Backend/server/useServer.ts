import { TableSectionDataFromServer } from "types";


const useServer = () => {


    const greetServer = async () => {
        const response = await fetch("http://localhost:1337/server");
        const data = await response.text();
        return data;
    }

    const getTableSectionData = async (): Promise<TableSectionDataFromServer> => {
        const response = await fetch("http://localhost:1337/get_table_section_data");
        const tableSectionData: TableSectionDataFromServer = await response.json();
        return tableSectionData;
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
    return { greetServer, updateRanking, getTableSectionData };
}

export { useServer };