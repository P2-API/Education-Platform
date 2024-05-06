// Make a csv turn into json. 
import { test, expect } from "vitest";
import { import_csv } from "../../Backend/utilities/csv_importer"

// Input is CSV_import_test.csv and output is output_test.ts
// The correct result is the file output_correct.ts
import_csv('Tests/csv_import_test.csv', 'Tests/csv_importer/output_test.ts')

//Get the files
import { educations_correct } from "./output_correct"
import { educations } from "./output_test"

// Run the test
test('csv imported correctly', () => {
    expect(JSON.stringify(educations)).toBe(JSON.stringify(educations_correct));
})