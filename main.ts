import TransitionTable from './src/transitionTable'
import { generateStrings } from './src/utils'
import DFA from './src/DFA'
import StringsList from './src/StringsList'


const stringsList = new StringsList("strings_list")

// Global State Variables
let symbolCount = 0
let machine: DFA = undefined

// HTML Elements
const sigmaInput = <HTMLInputElement>document.getElementById("sigma")
const addSymbolBtn = <HTMLButtonElement>document.getElementById("add_symbol_btn")
const removeSymbolBtn = <HTMLButtonElement>document.getElementById("remove_symbol_btn")
const addState = <HTMLButtonElement>document.getElementById("add_state_btn")
const removeState = <HTMLButtonElement>document.getElementById("remove_state_btn")
const transitionSelectionModal = <HTMLDivElement>document.querySelector("#transition_selection_modal")
const generateDfaBtn = <HTMLButtonElement>document.querySelector('#generate_dfa_btn')
const generateNfaBtn = <HTMLButtonElement>document.querySelector("#generate_nfa_btn")

const transitionTable = new TransitionTable("transition_table", "transition_selection_modal")
// add 2 symbols initially
sigmaInput.value = "a,b"
symbolCount = 2


addSymbolBtn.addEventListener("click",
    (e: MouseEvent): void => {
        transitionTable.addSymbol();
        symbolCount += 1
        if (sigmaInput.value !== "")
            sigmaInput.value += ","
        sigmaInput.value += `${String.fromCharCode(symbolCount + 96)}`
    }
)

removeSymbolBtn.addEventListener("click",
    (e: MouseEvent): void => {
        transitionTable.removeSymbol();
        if (symbolCount > 0)
            symbolCount -= 1
        sigmaInput.value = sigmaInput.value.slice(0, sigmaInput.value.length - 2)
    }
)


addState.addEventListener("click",
    (e: MouseEvent) => {
        transitionTable.addState();
    }
)

removeState.addEventListener("click",
    (e: MouseEvent) => {
        transitionTable.removeState();
    }
)

generateDfaBtn.addEventListener("click", () => {
    if (!transitionTable.validateDFA())
        alert("Not a valid DFA")
    else {
        machine = transitionTable.getDFA()
        const acceptedStrings = machine.getStringsUptoLimit(getStringLength())
        const allStrings = generateStrings(transitionTable.symbolCount, getStringLength())
        stringsList.clear()
        for (const str of allStrings) {
            if (acceptedStrings.indexOf(str) !== -1)
                stringsList.addItem(str, true)
            else
                stringsList.addItem(str, false)
        }
    }
})

generateNfaBtn.addEventListener("click", () => {
    if (!transitionTable.validateNFA())
        alert("Not a valid NFA")
    else {
        alert("NFA not yet implemented.")
    }
})


const stringLenInput = <HTMLInputElement>document.querySelector("#string_len_inp")
const dec_string_len_btn = <HTMLButtonElement>document.querySelector("#dec_string_len_btn")
const inc_string_len_btn = <HTMLButtonElement>document.querySelector("#inc_string_len_btn")

stringLenInput.value = "3"
dec_string_len_btn.addEventListener("click", () => {
    stringLenInput.value = String(parseInt(stringLenInput.value) - 1)
})

inc_string_len_btn.addEventListener("click", () => {
    stringLenInput.value = String(parseInt(stringLenInput.value) + 1)
})

const getStringLength = (): number => parseInt(stringLenInput.value)
