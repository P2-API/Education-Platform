import { describe, it, expect, test } from 'vitest';

import { caclulateEnumTypes, calculateMinMaxDegreeDuration, getEducationDurationRange } from '../../Backend/server/on-server-start';
import { MinimumMaximum } from '../../src/types';

// Expected minimum and maximum duration of any degree
const expectedDuration: MinimumMaximum = {
    minimum: 4,
    maximum: 36
}

test("Calculate the minimum and maximum duration of a degree", () => {
    caclulateEnumTypes(); // Calculate the enum types
    calculateMinMaxDegreeDuration(); // Calculate the minimum and maximum duration of any degree
    const duration: MinimumMaximum = getEducationDurationRange(); // Get the minimum and maximum duration of any degree
    expect(duration).toStrictEqual(expectedDuration);
});