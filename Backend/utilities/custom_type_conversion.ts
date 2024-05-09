import { Education, EducationGroup } from "../../src/types";

export function educationToEducationGroup(education: Education) {
    let educationGroup: EducationGroup = {
        title: education.title,
        url: education.url
    };
    return educationGroup;  
}