import { describe, it, expect, test } from 'vitest';

import { CountyToGeography, County, Geography } from '../../src/enums';

test("County To Geography", () => {
    expect(CountyToGeography(County.Frederiksberg)).toBe(Geography.Hovedstaden);
    expect(CountyToGeography(County['Ikast-Brande'])).toBe(Geography.Midtjylland);
    expect(CountyToGeography(County.Frederikshavn)).toBe(Geography.Nordjylland);
    expect(CountyToGeography(County.Vordingborg)).toBe(Geography.Sjælland);
    expect(CountyToGeography(County.Ærø)).toBe(Geography.Syddanmark);
    expect(CountyToGeography("Not Real" as County)).toBe(Geography.Ukendt);
});