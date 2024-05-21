import assert from "assert";
import {
    QuizAnswers,
    EducationDataFromServer,
    PCAData,
    EducationGroup,
    TableFilters,
    Education
} from "types";

const useServer = () => {


    const greetServer = async () => {
        const response = await fetch("http://localhost:1337/server");
        const data = await response.text();
        return data;
    }

    const getTableSectionData = async (): Promise<EducationDataFromServer> => {
        const response = await fetch("http://localhost:1337/get_table_section_data");
        const tableSectionData: EducationDataFromServer = await response.json();
        return tableSectionData;
    }

    const getGroupedEducations = async (): Promise<EducationGroup[]> => {
        const response = await fetch("http://localhost:1337/get_grouped_educations");
        const groupedEducations: EducationGroup[] = await response.json();
        return groupedEducations;
    }

    const getEducationsProperties = async (): Promise<any[]> => {
        const response = await fetch("http://localhost:1337/get_education_properties");
        const educationProperties: any[] = await response.json();
        return educationProperties;
    }

    const getNormalizedEducations = async (): Promise<Education[]> => {
        const response = await fetch("http://localhost:1337/get_normalized_educations");
        const normalizedEducations: any[] = await response.json();
        return normalizedEducations;
    }
    // write more functions here

    const getSmallTextAboutEducation = async (education: Education) => {
        console.log("education", education)
        
        const response = await fetch("http://localhost:1337/get_small_text_about_education", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ education })
        });
        console.log("response", response)
        const smallText = await response.text();
        console.log("smallText", smallText)    
        return smallText;
    }

    const updateRanking = async (filterProps: TableFilters, quizAnswers: QuizAnswers) => {
        console.log("im in here")
        const response = await fetch("http://localhost:1337/update_ranking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filterProps, quizAnswers })
        });
        console.log("filterProps", filterProps)

        const responseJson = await response.json(); // Read the response as text
        console.log("responseJson", responseJson)
        return responseJson;

    };

    const getPCAData = async (quizAnswers: QuizAnswers) => {
        const response = await fetch("http://localhost:1337/PCA_request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quizAnswers })
        });

        const responseJson: PCAData = await response.json();

        return responseJson;
    }


    // write more functions here

    return { greetServer, updateRanking, getTableSectionData, getPCAData, getGroupedEducations, getEducationsProperties, getSmallTextAboutEducation, getNormalizedEducations };
}

export { useServer };