// Make a csv turn into json. 

import { readFileSync } from "fs";
import { test, expect } from "vitest";


// Input is CSV_import_test.csv and output is JSON_output_test.json
// The correct result is the file JSON_correct.json
test('csv import as json', () => {
    function import_csv() {
        
    }
    

    var output = readFileSync('Tests\csv_importer\JSON_output_test.json');
    var answer = readFileSync('Tests\csv_importer\JSON_correct.json'); // TODO: This file is currently empty

    expect(output).toBe(answer);
})