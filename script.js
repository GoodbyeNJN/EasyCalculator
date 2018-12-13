$(() => {
    let calc = new Calc();
    $("#buttons ul li").click(event => {
        let btnName = $(event.target).text();
        calc.btnPressHandler(btnName);
    });
});

class Calc {
    constructor() {
        this.calcStates = {
            firstNum: "",
            operator: "",
            secondNum: "",
            result: "",
            lastAction: "clear"
            // lastAction: "clear"|"inputFirstNumber"|"inputOperator"|"inputSecondNumber"|"equal"
        };
        this.dispStates = {
            formula: "",
            input: "0"
        };
        this.updateDispStates();
        this.updateScreen();
    }
    getCalcStates() {
        return this.calcStates;
    }
    setCalcStates(value) {
        this.calcStates = value;
    }
    getDispStates() {
        return this.DispStates;
    }
    setDispStates(value) {
        this.DispStates = value;
    }
    updateScreen() {
        $("#formula").text(this.getDispStates().formula);
        $("#input").text(this.getDispStates().input);
    }
    updateDispStates() {
        let newDispStates = {};
        let firstNum = this.getCalcStates().firstNum;
        let operator = this.getCalcStates().operator;
        let secondNum = this.getCalcStates().secondNum;
        let result = this.getCalcStates().result;
        let lastAction = this.getCalcStates().lastAction;
        let actionRouter = {
            clear: {
                formula: "",
                input: "0"
            },
            inputFirstNumber: {
                formula: "",
                input: firstNum
            },
            inputOperator: {
                formula: firstNum + operator,
                input: operator
            },
            inputSecondNumber: {
                formula: firstNum + operator,
                input: secondNum
            },
            equal: {
                formula: firstNum + operator + secondNum,
                input: result.slice(0, 10)
            }
        };
        newDispStates = actionRouter[lastAction];
        if (newDispStates.formula.length > 42) {
            newDispStates.formula = "◄ " + newDispStates.formula.slice(-42);
        }
        this.setDispStates(newDispStates);
    }
    btnPressHandler(btnName) {
        let btnText = btnName.slice(-1);
        if (btnText.match(/\d/)) {
            this.inputNum(btnText);
        } else if (btnText.match(/\./)) {
            this.inputDot();
        } else if (btnText.match(/[%÷×+-]/)) {
            this.inputOperator(btnText);
        } else if (btnText === "c") {
            this.clear();
        } else if (btnText === "=") {
            this.equal();
        }
        this.updateDispStates();
        this.updateScreen();
    }
    inputNum(btnText) {
        let newCalcStates = this.getCalcStates();
        let lastAction = newCalcStates.lastAction;
        /*
        if (lastAction === "clear" || lastAction === "equal") {
            newCalcStates.firstNum = btnText;
            lastAction = "inputFirstNumber";
        } else if (lastAction === "inputFirstNumber") {
            if (newCalcStates.firstNum.length >= 10) {
                return;
            }
            if (newCalcStates.firstNum === "0") {
                newCalcStates.firstNum = btnText;
            } else {
                newCalcStates.firstNum += btnText;
            }
        } else if (lastAction === "inputOperator") {
            newCalcStates.secondNum = btnText;
            lastAction = "inputSecondNumber";
        } else if (lastAction === "inputSecondNumber") {
            if (newCalcStates.secondNum.length >= 10) {
                return;
            }
            if (newCalcStates.secondNum === "0") {
                newCalcStates.secondNum = btnText;
            } else {
                newCalcStates.secondNum += btnText;
            }
        }
 */
        let actionRouter = {
            clear: () => {
                newCalcStates.firstNum = btnText;
                lastAction = "inputFirstNumber";
            },
            inputFirstNumber: () => {
                if (newCalcStates.firstNum.length >= 10) {
                    return;
                }
                if (newCalcStates.firstNum === "0") {
                    newCalcStates.firstNum = btnText;
                } else {
                    newCalcStates.firstNum += btnText;
                }
            },
            inputOperator: () => {
                newCalcStates.secondNum = btnText;
                lastAction = "inputSecondNumber";
            },
            inputSecondNumber: () => {
                if (newCalcStates.secondNum.length >= 10) {
                    return;
                }
                if (newCalcStates.secondNum === "0") {
                    newCalcStates.secondNum = btnText;
                } else {
                    newCalcStates.secondNum += btnText;
                }
            },
            equal: () => {
                newCalcStates.firstNum = btnText;
                lastAction = "inputFirstNumber";
            }
        };
        actionRouter[lastAction]();

        newCalcStates.lastAction = lastAction;
        this.setCalcStates(newCalcStates);
    }
    inputDot() {
        let newCalcStates = this.getCalcStates();
        let lastAction = newCalcStates.lastAction;

        // if (lastAction === "clear" || lastAction === "equal") {
        //     newCalcStates.firstNum = "0.";
        //     lastAction = "inputFirstNumber";
        // } else if (lastAction === "inputFirstNumber") {
        //     if (!newCalcStates.firstNum.includes(".")) {
        //         newCalcStates.firstNum += ".";
        //     }
        // } else if (lastAction === "inputOperator") {
        //     newCalcStates.secondNum = "0.";
        //     lastAction = "inputSecondNumber";
        // } else if (lastAction === "inputSecondNumber") {
        //     if (!newCalcStates.secondNum.includes(".")) {
        //         newCalcStates.secondNum += ".";
        //     }
        // }

        let actionRouter = {
            clear: () => {
                newCalcStates.firstNum = "0.";
                lastAction = "inputFirstNumber";
            },
            inputFirstNumber: () => {
                if (!newCalcStates.firstNum.includes(".")) {
                    newCalcStates.firstNum += ".";
                }
            },
            inputOperator: () => {
                newCalcStates.secondNum = "0.";
                lastAction = "inputSecondNumber";
            },
            inputSecondNumber: () => {
                if (!newCalcStates.secondNum.includes(".")) {
                    newCalcStates.secondNum += ".";
                }
            },
            equal: () => {
                newCalcStates.firstNum = "0.";
                lastAction = "inputFirstNumber";
            }
        };
        actionRouter[lastAction]();

        newCalcStates.lastAction = lastAction;
        this.setCalcStates(newCalcStates);
    }
    inputOperator(btnText) {
        let newCalcStates = this.getCalcStates();
        let lastAction = newCalcStates.lastAction;

        // if (lastAction === "clear") {
        //     newCalcStates.firstNum = "0";
        //     newCalcStates.operator = btnText;
        // } else if (lastAction === "inputFirstNumber") {
        //     if (newCalcStates.firstNum.match(/\.$/)) {
        //         newCalcStates.firstNum = newCalcStates.firstNum.slice(0, -1);
        //     }
        //     newCalcStates.operator = btnText;
        // } else if (lastAction === "inputOperator") {
        //     newCalcStates.operator = btnText;
        // } else if (lastAction === "inputSecondNumber") {
        //     newCalcStates.firstNum += newCalcStates.operator + newCalcStates.secondNum;
        //     newCalcStates.operator = "";
        //     newCalcStates.secondNum = "";
        //     if (newCalcStates.firstNum.match(/\.$/)) {
        //         newCalcStates.firstNum = newCalcStates.firstNum.slice(0, -1);
        //     }
        //     newCalcStates.operator = btnText;
        // } else if (lastAction === "equal") {
        //     newCalcStates.firstNum = newCalcStates.result;
        //     newCalcStates.operator = btnText;
        // }

        let actionRouter = {
            clear: () => {
                newCalcStates.firstNum = "0";
                newCalcStates.operator = btnText;
            },
            inputFirstNumber: () => {
                if (newCalcStates.firstNum.match(/\.$/)) {
                    newCalcStates.firstNum = newCalcStates.firstNum.slice(0, -1);
                }
                newCalcStates.operator = btnText;
            },
            inputOperator: () => {
                newCalcStates.operator = btnText;
            },
            inputSecondNumber: () => {
                newCalcStates.firstNum += newCalcStates.operator + newCalcStates.secondNum;
                newCalcStates.operator = "";
                newCalcStates.secondNum = "";
                if (newCalcStates.firstNum.match(/\.$/)) {
                    newCalcStates.firstNum = newCalcStates.firstNum.slice(0, -1);
                }
                newCalcStates.operator = btnText;
            },
            equal: () => {
                newCalcStates.firstNum = newCalcStates.result;
                newCalcStates.operator = btnText;
            }
        };
        actionRouter[lastAction]();

        lastAction = "inputOperator";
        newCalcStates.lastAction = lastAction;
        this.setCalcStates(newCalcStates);
    }
    clear() {
        let newCalcStates = {
            firstNum: "",
            operator: "",
            secondNum: "",
            result: "",
            lastAction: "clear"
        };
        this.setCalcStates(newCalcStates);
    }
    equal() {
        let newCalcStates = this.getCalcStates();
        let lastAction = newCalcStates.lastAction;

        // if (lastAction === "inputFirstNumber") {
        //     if (newCalcStates.firstNum.match(/\.$/)) {
        //         newCalcStates.firstNum = newCalcStates.firstNum.slice(0, -1);
        //     }
        //     newCalcStates.result = newCalcStates.firstNum;
        // } else if (lastAction === "inputSecondNumber") {
        //     if (newCalcStates.secondNum.match(/\.$/)) {
        //         newCalcStates.secondNum = newCalcStates.secondNum.slice(0, -1);
        //     }
        //     let formula = newCalcStates.firstNum + newCalcStates.operator + newCalcStates.secondNum;
        //     if (formula.match(/([%÷]0[%÷×+-])|([%÷]0$)/)) {
        //         newCalcStates.result = "Err:DivBy0";
        //     } else {
        //         newCalcStates.result = String(eval(formula));
        //     }
        // }

        let actionRouter = {
            clear: () => {},
            inputFirstNumber: () => {
                if (newCalcStates.firstNum.match(/\.$/)) {
                    newCalcStates.firstNum = newCalcStates.firstNum.slice(0, -1);
                }
                newCalcStates.result = newCalcStates.firstNum;
            },
            inputOperator: () => {},
            inputSecondNumber: () => {
                if (newCalcStates.secondNum.match(/\.$/)) {
                    newCalcStates.secondNum = newCalcStates.secondNum.slice(0, -1);
                }
                let formula = newCalcStates.firstNum + newCalcStates.operator + newCalcStates.secondNum;
                if (formula.match(/([%÷]0[%÷×+-])|([%÷]0$)/)) {
                    newCalcStates.result = "Err:DivBy0";
                } else {
                    newCalcStates.result = String(eval(formula.replace(/÷/g, "/").replace(/×/g, "*")));
                }
            },
            equal: () => {}
        };
        actionRouter[lastAction]();

        lastAction = "equal";
        newCalcStates.lastAction = lastAction;
        this.setCalcStates(newCalcStates);
    }
}
