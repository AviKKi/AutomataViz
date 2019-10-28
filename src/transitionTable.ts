import DFA from './DFA'

/**
* class to keep track of transition table and render it in dom
* and return a DFA / NFA object when table is complete
 */
class TransitionTable {
    table: HTMLTableElement
    modal: HTMLDivElement
    symbolCount: number
    stateCount: number

    constructor(tableId: string, modalId: string) {
        this.table = <HTMLTableElement>document.getElementById(tableId)
        this.modal = <HTMLDivElement>document.getElementById(modalId)
        this.symbolCount = 0
        this.stateCount = 0
        // add 2 states and symbols initially
        this.addState()
        this.addState()
        this.addSymbol()
        this.addSymbol()
    }


    validateDFA(): boolean {
        if (!this.validateNFA())
            return false
        // check that there is only one transition per cell
        const cells = this.table.getElementsByTagName("td")
        for (let i = 0; i < cells.length; i++)
            if (cells[i].innerText.indexOf(",") !== -1)
                return false
        return true
    }

    getDFA(): DFA {
        // get final states
        const finalStates: number[] = []
        for (const cell of this.table.getElementsByTagName('td')) {
            if (cell.innerText.indexOf("*") !== -1)
                finalStates.push(parseInt(cell.innerText))
        }

        // construct dfa object
        const dfa = new DFA(this.stateCount, this.symbolCount, finalStates)

        // set the transitions
        for (const cell of this.table.getElementsByTagName('td')) {
            if (cell.id.indexOf(";") !== -1) {
                const [state, symbol] = cell.id.split(";").map(s => parseInt(s))
                const nextState = parseInt(cell.innerText)
                dfa.setTransition(state, symbol, nextState)
            }
        }

        return dfa
    }

    validateNFA(): boolean {
        // check if all the transitions are complete .i.e cell.innerText!=="-"
        const cells = this.table.getElementsByTagName("td")
        for (let i = 0; i < cells.length; i++)
            if (cells[i].innerText === "-")
                return false
        return true
    }

    getNFA = () => { }

    /**
     * Convert the string(cell.innerText) to Array of span elements to render
     * @param s String present in the cell ex, "-", "0", "0,1"
     */
    stringToSelected(s: string): HTMLSpanElement[] {
        const selected = (s !== "-") ? s.split(',') : []

        return Array(this.stateCount).fill(0).map((_, idx) => {
            const elm = document.createElement("span")
            elm.innerText = idx.toString()
            if (selected.indexOf(idx.toString()) !== -1)
                elm.className = "selected"
            elm.addEventListener("click", (e: MouseEvent) => {
                const el = (e.target as HTMLElement)
                const className = el.className
                if (className === "selected")
                    elm.className = ""
                else
                    elm.className = "selected"
            })
            return elm
        })
    }

    /**
     * return string of selected states seperated by comma, will be set as cell.innerText
     * @param states_container div element containing the states, inside transition selection modal
     */
    selectedToString(states_container: HTMLDivElement): string {
        let ret = []
        for (let i = 0; i < states_container.children.length; i++) {
            if (states_container.children[i].className === "selected") ret.push((states_container.children[i] as HTMLElement).innerText)
        }
        if (ret.length > 0)
            return ret.join()
        return "-"
    }

    saveTransition = (cell: HTMLSpanElement, states_container: HTMLDivElement) => {
        const string_data = this.selectedToString(states_container)
        cell.innerText = string_data
        this.modal.style.display = "none"
    }

    loadTransition = (cell: HTMLSpanElement, states_container: HTMLDivElement) => {

    }

    /**
     * Callback for each transition cell, will display next state selection modal. 
     */
    setTransition = (e: MouseEvent) => {
        const cellId = (e.target as HTMLTableCellElement).id
        const cell = <HTMLSpanElement>e.target
        this.modal.style.display = "block";
        const states_container = <HTMLDivElement>this.modal.querySelector("#transition_states")
        // remove child nodes
        states_container.innerHTML = ""
        // add child nodes
        this.stringToSelected(cell.innerText).forEach(element => {
            states_container.appendChild(element)
        });

        const saveBtnOriginal = this.modal.querySelector("#modal_save_btn")
        // Remove old listners from save button
        const saveBtn = saveBtnOriginal.cloneNode(true)
        this.modal.replaceChild(saveBtn, saveBtnOriginal)
        // Add event listner to save button
        saveBtn.addEventListener("click", () => this.saveTransition(cell, states_container))

    }


    /**
     * Create a cell(<td></td>) for transition table, `state;symbol` is used as element's id. 
     * @param x x-coordinate or state number
     * @param y y-coordinate or symbol number
     */
    createCell(x: number, y: number): HTMLTableCellElement {
        let cell = document.createElement('td');
        cell.innerText = "-";
        cell.id = `${x};${y}`
        cell.addEventListener("click", this.setTransition);
        return cell
    }

    /**
     * Add a new symbol to transition table, i.e. creates a new column
     */
    addSymbol() {
        this.symbolCount += 1;
        const rowhead = document.createElement('td');
        rowhead.innerText = String.fromCharCode(this.symbolCount + 96)
        this.table.rows[0].appendChild(rowhead);

        for (let i = 1; i < this.table.rows.length; i++) {
            const cell = this.createCell(i - 1, this.symbolCount - 1)
            this.table.rows[i].appendChild(cell)
        }

    }


    /**
     * Remove last symbol from transition table, i.e. removes a column
     */
    removeSymbol() {
        if (this.symbolCount >= 1) {
            this.symbolCount -= 1
            for (let i = 0; i < this.table.rows.length; i++) {
                this.table.rows[i].lastElementChild.remove();
            }
        }
    }

    /**
     * Add a new symbol to transition table, i.e. creates a new row
     */
    addState() {
        this.table.insertRow()
        const lastRow = this.table.rows[this.table.rows.length - 1]
        const cell = document.createElement('td')
        cell.innerText = this.stateCount.toString()
        cell.addEventListener("click", this.setFinalState)
        lastRow.appendChild(cell)

        for (let i = 0; i < this.table.rows[0].childElementCount - 1; i++) {
            const cell = this.createCell(this.stateCount, i)
            lastRow.appendChild(cell)
        }
        this.stateCount += 1
    }


    /**
     * Remove last state from transition table, i.e. removes a row
     */
    removeState() {
        if (this.stateCount > 0) {
            this.stateCount -= 1
            this.table.deleteRow(this.table.rows.length - 1)
        }
    }

    /**
     * Callback function to mark a state as final state(*), on click
     */
    setFinalState = (e: MouseEvent) => {
        const cell = <HTMLElement>e.target
        if (cell.innerText.indexOf("*") !== -1) {
            const elm = cell.querySelector("sup")
            elm.remove()
        }
        else {
            const elm = document.createElement('sup')
            elm.innerText = "*"
            cell.appendChild(elm)
        }
    }
}

export default TransitionTable