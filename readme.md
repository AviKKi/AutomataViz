# AutomataViz
Visual tool for learning automata theory

### How to use?

1. Add required number of states and symbols with `Add State` / `Add Symbol` button
2. Set tranisition by clicking each empty cell `-` in transition table, selecting apporpriate next state and pressing `Save` .
3. In first column i.e States column, select final state by clicking on it, final states will have a asterik(*).
4. Set the string length (default is 3).
5. Click on generate DFA/NFA.
6. Now list of accepted strings will be shown(printed in console)

### How to run locally??

    Currently no build system has been setup for this project so simply use (ParcelJS)[https://parceljs.org]
`parcel index.html` 

---------

### ToDo

    [ ] Feature to save and load machines
    [ ] Test Custom String input
    [x] Show accepted strings in webpage  
    [ ] Implement NFA
    [ ] Implement directed graph visualization of machine
    [ ] Add DFA minimization
    [ ] Add NFA to DFA converter

