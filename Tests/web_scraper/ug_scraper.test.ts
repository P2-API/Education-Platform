import { expect, test } from 'vitest'
import * as fs from 'fs';
import { getHeadlinerText } from '../../Backend/utilities/web_scraper.ts';
import { getDescribingText } from '../../Backend/utilities/web_scraper.ts';


test("test of the web scraper for headliner text", async () => {
    const inputPromise = new Promise<string>((resolve, reject) => {
        fs.readFile('..\..\Education-Platform\Tests\web_scraper\testdata.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

    const outputPromise = new Promise<string>((resolve, reject) => {
        fs.readFile('../../Tests/web_scraper/outputdata_headliner.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

    // Wait for both file reading operations to complete
    const [input, output] = await Promise.all([inputPromise, outputPromise]);

    const result = getHeadlinerText(input);
    console.log(result);
    expect(result).toBe(output);
});

test("test of the web scraper for describing text", async () => {
    const inputPromise = new Promise<string>((resolve, reject) => {
        fs.readFile('..\..\Education-Platform\Tests\web_scraper\testdata.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

    const outputPromise = new Promise<string>((resolve, reject) => {
        fs.readFile('../../Tests/web_scraper/outputdata_describing.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

    // Wait for both file reading operations to complete
    const [input, output] = await Promise.all([inputPromise, outputPromise]);

    const result = getDescribingText(input);

    expect(result).toBe(output);
});