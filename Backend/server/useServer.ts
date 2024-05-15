import { QuizAnswers, TableSectionDataFromServer, PCAData, Education, EducationGroup } from "types";
import { FilterProps } from "@frontend/components/TableSection/FilterBoxComponent";

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

    const getGroupedEducations = async (): Promise<EducationGroup[]> => {
        const response = await fetch("http://localhost:1337/get_grouped_educations");
        const groupedEducations: EducationGroup[] = await response.json();
        return groupedEducations;
    }

    const getEducationsProperties = async (): Promise<any[]> => {
        const response = await fetch("http://localhost:1337/get_education_properties");
        const educationProperties: any[]= await response.json();
        return educationProperties;
    }
    // write more functions here



    const updateRanking = async (filterProps: FilterProps, quizAnswers: QuizAnswers, data: Education[]) => {

        const response = await fetch("http://localhost:1337/update_ranking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filterProps, quizAnswers, data })
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

    return { greetServer, updateRanking, getTableSectionData, getPCAData, getGroupedEducations, getEducationsProperties };
}

export { useServer };