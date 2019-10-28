import { generateStrings } from './utils'
import Machine from './Machine'

class DFA implements Machine {
    statesCount: number
    symbolCount: number
    finalStates: number[]
    transitionMatrix: number[][]

    constructor(statesCount: number, symbolCount: number, finalStates: number[]) {
        this.statesCount = statesCount
        this.symbolCount = symbolCount
        this.finalStates = finalStates
        this.transitionMatrix = []
        // Fill the tranistion matrix, initially has undefined
        for (let i = 0; i < this.statesCount; i++) {
            this.transitionMatrix.push(Array(this.symbolCount))
        }
    }

    // set a transition
    setTransition(state: number, symbol: number, nextState: number) {
        this.transitionMatrix[state][symbol] = nextState
    }

    /*
    * return all strings of length upto given limit
    */
    getStringsUptoLimit(limit: number): string[] {
        const strings: string[] = []
        for (const str of generateStrings(this.symbolCount, limit)) {
            if (this.testString(str))
                strings.push(str)
        }
        return strings
    }

    /*
    * Test if a given string is accepted by the machine
    */
    testString(s: string): boolean {

        let currentState = 0
        for (let i = 0; i < s.length; i++) {
            const symbol = s.charCodeAt(i) - 97
            currentState = this.transitionMatrix[currentState][symbol]
        }
        return this.finalStates.indexOf(currentState) !== -1
    }
}

export default DFA