// Make a csv turn into json.
import { test, expect } from "vitest";
import { importCSV, removeSemicolonsBetweenQuotes } from "../../Backend/utilities/csv_importer"
import * as correctAnswer from "./output_correct"

// Run the test 
test('csv imported correctly', () => {
    // Input is CSV_import_test.csv and output is output_test.ts
    // The correct result is the file output_correct.ts

    const educations = importCSV(/*'Tests/csv_importer/output_test.ts', */'Tests/csv_importer/csv_import_test.csv');
    const educationsCorrect = correctAnswer.educations;

    expect(educations).toStrictEqual(educationsCorrect);
})

test('stray semicolons removed', () => {
    
    const input = 'Some; "value; with"; semicolons; inside; "quotes; like; this;"';
    const output = removeSemicolonsBetweenQuotes(input);
    const expectedOutput = 'Some; "value with"; semicolons; inside; "quotes like this"';
    expect(output).toBe(expectedOutput);
})