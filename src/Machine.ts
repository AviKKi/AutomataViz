interface Machine {
    testString(inputString: string): boolean, // test if the given string is accepted by the machine
    getStringsUptoLimit(limit: number): string[], // return all strings s, such that s is accepted and |s|<=limit
    setTransition(state: number, symbol: number, nextState: number): void
}

export default Machine