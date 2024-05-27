import {
    QuizAnswers,
    EducationDataFromServer,
    PCAData,
    EducationGroup,
    TableFilters,
    Education
} from "types";

const BASEURL = `https://cs-24-dat-2-02.p2datsw.cs.aau.dk/node2/node2`;

const useServer = () => {
    const greetServer = async () => {
        const response = await fetch(`${BASEURL}/server`);
        const data = await response.text();
        return data;
    }

    const getTableSectionData = async (): Promise<EducationDataFromServer> => {
        const response = await fetch(`${BASEURL}/get_table_section_data`);
        const tableSectionData: EducationDataFromServer = await response.json();
        return tableSectionData;
    }

    const getGroupedEducations = async (): Promise<EducationGroup[]> => {
        const response = await fetch(`${BASEURL}/get_grouped_educations`);
        const groupedEducations: EducationGroup[] = await response.json();
        return groupedEducations;
    }

    const getEducationsProperties = async (): Promise<any[]> => {
        const response = await fetch(`${BASEURL}/get_education_properties`);
        const educationProperties: any[] = await response.json();
        return educationProperties;
    }

    const getNormalizedEducations = async (): Promise<Education[]> => {
        const response = await fetch(`${BASEURL}/get_normalized_educations`);
        const normalizedEducations: any[] = await response.json();
        return normalizedEducations;
    }

    const getPersonalizedMessage = async (filters: TableFilters, quizAnswers: QuizAnswers, education: Education, doesPassFilters: Boolean) => {
        const response = await fetch(`${BASEURL}/generate_personalized_message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filters, quizAnswers, education, doesPassFilters })
        });
        const personalizedMessage = await response.text();
        return personalizedMessage;
    }

    const getSmallTextAboutEducation = async (education: Education) => {
        const response = await fetch(`${BASEURL}/get_small_text_about_education`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ education })
        });
        const smallText = await response.text();
        return smallText;
    }

    const updateRanking = async (filterProps: TableFilters, quizAnswers: QuizAnswers) => {
        const response = await fetch(`${BASEURL}/update_ranking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filterProps, quizAnswers })
        });

        const responseJson = await response.json();
        return responseJson;
    };

    const getPCAData = async (quizAnswers: QuizAnswers, filters: TableFilters) => {
        const response = await fetch(`${BASEURL}/PCA_request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quizAnswers, filters })
        });

        const responseJson: PCAData = await response.json();
        return responseJson;
    }

    return { greetServer, updateRanking, getTableSectionData, getPCAData, getGroupedEducations, getEducationsProperties, getSmallTextAboutEducation, getNormalizedEducations, getPersonalizedMessage };
}

export { useServer };
