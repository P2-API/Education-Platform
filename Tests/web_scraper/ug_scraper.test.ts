import { expect, test } from 'vitest'



test('adds 1 + 2 to equal 3', () => {
    const input = { a: 1, b: 2 };
    function add(a: number, b: number) {
        return a + b;
    }
    const output = 4;
    const result = add(input.a, input.b);

    expect(result).toBe(output);
})

test('adds 1 - 2  to equal 3', () => {
    const input = { a: 1, b: 2 };
    function subtract(a: number, b: number) {
        return a - b;
    }
    const output = -1;
    const result = subtract(input.a, input.b);

    expect(result).toBe(output);
})