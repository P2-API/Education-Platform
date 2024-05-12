import { TableSectionDataFromServer } from "types";

export type PCAData = {
    x_axis: string[];
    y_axis: string[];
}

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

    const getPCAData = async (PCA_request: PCAData) => {
        const response = await fetch("http://localhost:1337/PCA_request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ PCA_request })
        });

        return response
    }

    // write more functions here

    return { greetServer, updateRanking, getTableSectionData, getPCAData };
}

export { useServer };