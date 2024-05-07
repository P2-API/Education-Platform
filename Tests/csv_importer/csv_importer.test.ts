// Make a csv turn into json.
import { test, expect } from "vitest";
import { importCSV } from "../../Backend/utilities/csv_importer"
import * as testFile from "./output_test"
import * as correctAnswer from "./output_correct"

// Run the test 
test('csv imported correctly', () => {
    // Input is CSV_import_test.csv and output is output_test.ts
    // The correct result is the file output_correct.ts
    importCSV('Tests/csv_importer/output_test.ts', 'Tests/csv_importer/csv_import_test.csv');

    expect(testFile).toStrictEqual(correctAnswer);
})