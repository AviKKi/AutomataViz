/**
 * map integer to character/Symbol, 0->a,1->b,...
 * @param i index of the character
 */
const intToSymbol = (i: number): string => `${String.fromCharCode(97 + i)}`

// TODO: replace this with generator function
/**
 * Generate all possible string upto a given length
 * @param symbolCount Number of symbols to use
 * @param length Max length of string
 */
function generateStrings(symbolCount: number, length: number): string[] {
    const strings: string[] = []

    function recursion(length: number, s: string = "") {
        strings.push(s)
        if (length <= 0) { return }
        for (let i = 0; i < symbolCount; i++)
            recursion(length - 1, s + intToSymbol(i))
    }
    recursion(length)

    return strings
}

export { generateStrings }