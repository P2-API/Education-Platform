import { describe, it, expect, test } from 'vitest';

import { caclulateEnumTypes, calculateMinMaxDegreeDuration } from '../../Backend/server/on-server-start';
import { MinimumMaximum } from '../../src/types';

const expectedDuration: MinimumMaximum = {
    minimum: 4,
    maximum: 36
}

test("Calculate the minimum and maximum duration of a degree", () => {
    caclulateEnumTypes();
    const duration: MinimumMaximum = calculateMinMaxDegreeDuration();
    expect(duration).toStrictEqual(expectedDuration);
});