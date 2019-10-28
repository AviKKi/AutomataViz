export default class StringsList {
    table: HTMLDivElement
    /**
     * 
     * @param id id of HTMLDivElement to contain strings list
     */
    constructor(id: string) {
        this.table = <HTMLDivElement>document.getElementById(id)
    }

    /**
     * Add a string to the list
     * @param str string to be added
     * @param accepted boolean true if string is accepted
     */
    addItem(str: string, accepted: boolean): void {
        const elm = document.createElement("div")
        elm.innerText = str || "є"
        elm.className = accepted ? "accepted" : "notaccepted"
        this.table.appendChild(elm)
    }

    /**
     * Remove every string from the list
     */
    clear(): void {
        this.table.innerHTML = ""
    }
}