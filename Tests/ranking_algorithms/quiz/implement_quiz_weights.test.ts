// Take quiz weights as input and modify data for ranking algorithm accordingly. 


const quizWeights = [0.5 , 0.2, 0.3, 0.4, 0.1, 0.6, 0.7, 0.8, 0.9, 1.0];


const listOfDegreeObjects = [
    { 
        degree: 'Bachelor', 
        weight: 0.8, 
        category: 'Science' },
    { degree: 'Master', weight: 1.0, category: 'Engineering' },
    { degree: 'PhD', weight: 1.2, category: 'Research' },
    { degree: 'Associate', weight: 0.6, category: 'Business' },
    { degree: 'High School Diploma', weight: 0.4, category: 'Education' },
    { degree: 'Certificate', weight: 0.5, category: 'Vocational' },
    { degree: 'Diploma', weight: 0.7, category: 'Art' },
    // Add more objects as needed
];



