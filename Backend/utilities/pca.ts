import { EducationData, EducationVector, PCAData, UserInputs } from "../../src/types";
import { Ranker } from "./ranking";
import { PCA, PCAOptions } from "ml-pca";
import { getEducationData } from "../server/on-server-start";

export function performPCA(userInputs: UserInputs): PCAData {
    const educations: EducationVector[] = constructEducationVectors(userInputs);
    const dataset = constructMatrix(educations)

    const pcaSettings: PCAOptions = {
        scale: true,                 // standerdize the data
        ignoreZeroVariance: true,    // ignore columns with zero variance for faster computation
        method: 'covarianceMatrix'   // method equevalent to that described in the report
    }
    const Pca = new PCA(dataset, pcaSettings);
    const transformedData: number[][] = Pca.predict(dataset, { nComponents: 2 }).to2DArray();
    return pcaData(educations, transformedData, Pca);
}

export function constructMatrix(educations: EducationVector[]): number[][] {
    const matrix: number[][] = []
    educations.forEach((education) => {
        const row: number[] = []
        education.coordinates.forEach((coordinate) => {
            row.push(coordinate.value)
        })
        matrix.push(row)
    })
    return matrix
}

export function pcaData(educations: EducationVector[], transformedData: number[][], Pca: PCA): PCAData {
    const pcaData: PCAData = { points: [], principalComponents: { xAxis: { composition: [], varianceExplained: 0 }, yAxis: { composition: [], varianceExplained: 0 } } }
    educations.forEach((education, index) => {
        pcaData.points.push({ x: transformedData[index][0], y: transformedData[index][1], education: education.education })
    })
    const explainedVariance: number[] = Pca.getExplainedVariance();
    const eigenvectors: number[][] = Pca.getEigenvectors().to2DArray();

    pcaData.principalComponents.xAxis.varianceExplained = explainedVariance[0]
    pcaData.principalComponents.yAxis.varianceExplained = explainedVariance[1] 
    eigenvectors[0].forEach((coefficient, i) => {
        pcaData.principalComponents.xAxis.composition.push({ variable: educations[0].coordinates[i].name, coeff: coefficient }) // the composition property is filled in for each axis
    })
    eigenvectors[1].forEach((coefficient, i) => {
        pcaData.principalComponents.yAxis.composition.push({ variable: educations[0].coordinates[i].name, coeff: coefficient }) // the composition property is filled in for each axis
    })
    
    pcaData.principalComponents.xAxis.composition.sort((a, b) => Math.abs(b.coeff) - Math.abs(a.coeff))
    pcaData.principalComponents.yAxis.composition.sort((a, b) => Math.abs(b.coeff) - Math.abs(a.coeff))

    console.log("xaxis",pcaData.principalComponents.xAxis.composition, pcaData.principalComponents.xAxis.varianceExplained)
    console.log("yaxis",pcaData.principalComponents.yAxis.composition, pcaData.principalComponents.yAxis.varianceExplained)

    return pcaData
}

export function constructEducationVectors(userInputs: UserInputs): EducationVector[] {
    const educations: EducationData = getEducationData()
    const educationVectors: EducationVector[] = []
    const ranker = new Ranker()

    educations.normalized.forEach((education) => {
        educationVectors.push(ranker.educationVector(education, userInputs))
    })

    return educationVectors
}
