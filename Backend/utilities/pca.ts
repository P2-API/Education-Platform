import { EducationData, EducationVector, PCAData, QuizAnswers} from "../../src/types";
import { Ranker } from "./ranking";
import { PCA, PCAOptions} from "ml-pca";
import { getEducationData } from "../server/on-server-start";

export function performPCA(quizAnswers:QuizAnswers):PCAData{
    const educations:EducationVector[] = constructEducationVecotors(quizAnswers);
    //console.log("coordinates", educations.map((education) => education.coordinates))
    const dataset = constructMatrix(educations)
    //console.log("dataset", dataset)

    const pcaSettings:PCAOptions = {
        scale:true,                 // standerdize the data
        ignoreZeroVariance:true,    // ignore columns with zero variance for faster computation
        method:'covarianceMatrix'   // method equevalent to that described in the report
    }
    const Pca = new PCA(dataset, pcaSettings);
    const transformedData:number[][] = Pca.predict(dataset, {nComponents:2}).to2DArray();
    return pcaData(educations, transformedData, Pca);
}

function constructMatrix(educations:EducationVector[]):number[][]{
    const matrix:number[][] = []
    educations.forEach((education) => {
        const row:number[] = []
        education.coordinates.forEach((coordinate) => {
            row.push(coordinate.value)
        })
        matrix.push(row)
    })
    return matrix
}

function pcaData(educations:EducationVector[], transformedData:number[][], Pca:PCA):PCAData{
    const pcaData:PCAData = {points:[], principalComponents:{xAxis: {composition: [], varianceExplained:0}, yAxis: {composition: [], varianceExplained:0}}}
    educations.forEach((education, index) => {
        pcaData.points.push({x:transformedData[index][0], y:transformedData[index][1], education:education.education})
    })
    const explainedVariance:number[] = Pca.getExplainedVariance(); 
    const eigenvectors:number[][] = Pca.getEigenvectors().to2DArray();
    
    Object.keys(pcaData.principalComponents).forEach((axis, index) => {
        pcaData.principalComponents[axis].varianceExplained = explainedVariance[index] //explainedVariance property is filled in for each axis
        eigenvectors[index].forEach((coefficient, i) => {
            pcaData.principalComponents[axis].composition.push({variable: educations[0].coordinates[i].name, coeff: coefficient}) // the composition property is filled in for each axis
        })
    })
    return pcaData
}

function constructEducationVecotors(weights:QuizAnswers):EducationVector[]{
    const educations:EducationData = getEducationData()
    const educationVectors:EducationVector[] = []
    //console.log("educations", educations.normalized)
    const ranker = new Ranker()
    
    educations.normalized.forEach((education) => {
        educationVectors.push(ranker.educationVector(education, weights))
    })
    
    return educationVectors
}
