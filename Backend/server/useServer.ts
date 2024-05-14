import { QuizAnswers, TableSectionDataFromServer } from "types";

export type PCAData = {
    x_axis: string[];
    y_axis: string[];
}

export type RankingResult = [{
    EducationId: number;
    ranking: number;
}]
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



    const updateRanking = async (filterProps: FilterProps, quizAnswers: QuizAnswers) => {

        const response = await fetch("http://localhost:1337/update_ranking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filterProps, quizAnswers })
        });

        return response
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