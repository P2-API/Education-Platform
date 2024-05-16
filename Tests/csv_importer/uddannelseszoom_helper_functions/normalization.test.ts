import { test, expect } from 'vitest'
import normilize from '../../../Backend/utilities/normalization'



test("Normalization", () => {
    let number = 30; // Mock number
    let min = 0; // Mock minimum
    let max = 100; // Mock maximum
    expect(normilize(number, min, max)).toStrictEqual(0.3);

    number = -2; // Mock number
    expect(normilize(number, min, max)).toStrictEqual(-0.02);

    number = 200; // Mock number
    expect(normilize(number, min, max)).toStrictEqual(2);

    number = 4.43; // Mock number
    min = 70.8; // Mock minimum
    max = 100.3; // Mock maximum
    expect(normilize(number, min, max)).closeTo(-2.24983050847458, 0.00000000001); // Close to the expected value, due to floating point precision
});