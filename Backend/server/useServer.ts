import { QuizAnswers, TableSectionDataFromServer, PCAData, Education } from "types";
import { FilterProps } from "types"

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

        try {
            const response = await fetch("http://localhost:1337/update_ranking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ filterProps, quizAnswers })
            });

            const responseText = await response.text(); // Read the response as text

            if (!response.ok) {
                console.error("Failed to update ranking", responseText);
                throw new Error("Failed to update ranking");
            }

            try {
                const ranking = JSON.parse(responseText); // Parse the text as JSON
                console.log("ranking", ranking);
                return ranking;
            } catch (parseError) {
                console.error("Error parsing JSON response:", responseText);
                throw new Error("Invalid JSON response");
            }
        } catch (error) {
            console.error("Error updating ranking:", error);
            throw error;
        }
    };

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