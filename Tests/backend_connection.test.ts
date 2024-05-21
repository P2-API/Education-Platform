import { test, expect } from 'vitest'



test('patrick is patrick', () => {
    expect('patrick').toBe('patrick')
})

test('patrick is not patrick', () => {
    expect('patrick').not.toBe('patrick')
})

test('The multiple of 2 and 3 is 6', () => {
    expect(2 * 3).toBe(6)
})   