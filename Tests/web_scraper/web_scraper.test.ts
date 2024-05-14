import { test, expect } from "vitest";
import { getHeadliner } from "../../Backend/utilities/web_scraper"


test('getHeadliner function retrieves correct headliner text', async () => {
    // Define input and expected output
    const input = "https://www.ug.dk/uddannelser/bachelorogkandidatuddannelser/bacheloruddannelser/naturvidenskabeligebacheloruddannelser/matematikfysikkemiogdatalogi/datalogi";
    const expectedOutput = "Som datalog designer og udvikler du de it-systemer, som danner grundlag for uundværlige funktioner for mennesker, virksomheder og samfund.";

    // Execute the function and await the result
    const result = await getHeadliner(input);

    // Assert the result
    if (typeof result === "string") {
        // If the result is a string, it means there was an error fetching the URL
        ("Error fetching the URL");
        expect(result).toBe("Error fetching the URL");
    } else {
        // If the result is an object, check the headlinerText property
        expect(result.headlinerText).toBe(expectedOutput);
    }
});