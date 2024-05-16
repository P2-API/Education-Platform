import { test, expect } from 'vitest'

import deepCopy from '../../Backend/utilities/deep-copy'
import { education1 } from './calculate-minimum-and-maximum-education.test'

test("Deep Copying", () => {
    expect(deepCopy(education1)).toStrictEqual(education1); // Test for an object
    expect(deepCopy({})).toStrictEqual({}); // Test for an empty object
    expect(deepCopy("")).toStrictEqual(""); // Test for an empty string
});