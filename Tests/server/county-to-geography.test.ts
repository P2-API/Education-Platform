import { describe, it, expect, test } from 'vitest';

import { County, Geography } from '../../src/enums';
import { countyToGeography } from '../../Backend/utilities/custom-type-conversion';


test("County To Geography", () => {
    expect(countyToGeography(County.Frederiksberg)).toBe(Geography.Hovedstaden);
    expect(countyToGeography(County['Ikast-Brande'])).toBe(Geography.Midtjylland);
    expect(countyToGeography(County.Frederikshavn)).toBe(Geography.Nordjylland);
    expect(countyToGeography(County.Vordingborg)).toBe(Geography.Sjælland);
    expect(countyToGeography(County.Ærø)).toBe(Geography.Syddanmark);
    expect(countyToGeography("Not Real" as County)).toBe(Geography.Ukendt); // Test for a non-existent county
});