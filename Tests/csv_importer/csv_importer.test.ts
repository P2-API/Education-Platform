// Make a csv turn into json.
import { test, expect } from "vitest";
import { import_csv } from "../../Backend/utilities/csv_importer"
import * as testFile from "./output_test"
import * as correctAnswer from "./output_correct"

// Run the test 
test('csv imported correctly', () => {
    // Input is CSV_import_test.csv and output is output_test.ts
    // The correct result is the file output_correct.ts
    import_csv('Tests/csv_importer/csv_import_test.csv', 'Tests/csv_importer/output_test.ts');

    expect(testFile).toStrictEqual(correctAnswer);
})