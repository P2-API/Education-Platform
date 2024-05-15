import { test, expect } from 'vitest'
import normilize from '../../../Backend/utilities/normalization'



test("Normalization", () => {
    let number = 30;
    let min = 0;
    let max = 100;
    expect(normilize(number, min, max)).toStrictEqual(0.3);

    number = -2;
    expect(normilize(number, min, max)).toStrictEqual(-0.02);

    number = 200;
    expect(normilize(number, min, max)).toStrictEqual(2);

    number = 4.43;
    min = 70.8;
    max = 100.3;
    expect(normilize(number, min, max)).closeTo(-2.24983050847458, 0.00000000001);
});