class Screen {
    static show(value) {
        document.querySelector(".sc").textContent = value;
    }

}

class Data {
    constructor() {
        this.dataStorage = "";
        this.beforeSign = "";
        this.flagDot = false;
        this.arraySign = ["+", "-", "*", "/"]
    }

    setFlag() {
        this.flagDot = true;
    }
    addToStorage(actualDataStorage) {
        this.dataStorage += actualDataStorage;
    }
    getActualStorage() {
        return this.dataStorage;
    }
    clearStorage() {
        this.dataStorage = "";
    }
    clearFlag() {
        this.flagDot = false
    }
    addToBeforeSign(sign) {
        this.beforeSign = sign;
    }
    checkZeroWithDot(sign) {
        if (((!(this.getActualStorage())) && sign === "0") || this.checkBeforeSignIsOperation() && sign === "0") {
            this.setFlag()
            this.addToStorage("0.")
            Screen.show(this.getActualStorage())
            this.addToBeforeSign(".")
            return true
        } else false
    }

    checkFlagDot(sign) {
        if (this.flagDot && this.checkIfIsDot(sign)) return true
        else return false
    }
    checkIfIsDot(sign) {
        if (sign === ".") return true
        else return false
    }

    checkBeforeSignIsOperation() {
        if (this.arraySign.includes(this.beforeSign)) {
            return true;
        } else return false
    }
    checkActualSign(sign) {
        if (this.arraySign.includes(sign)) {
            return true;
        } else return false
    }

    checkSignOperation(sign) {
        if ((this.checkBeforeSignIsOperation()) && this.checkActualSign(sign)) {
            return false
        } else if (!(sign)) return false;
        else return true
    }
}

class Calculator {
    constructor() {
        this.numberButtons = [...document.querySelectorAll(".sign")];
        this.numberButtons.forEach(number => {
            number.addEventListener("click", this.numbersF.bind(this))
        })
        this.scoreButton = document.querySelector(".equal");
        this.scoreButton.addEventListener("click", this.scoreF.bind(this));
        this.ac = document.querySelector(".ac")
        this.ac.addEventListener("click", this.acF.bind(this))
        this.data = new Data();
    }

    numbersF(e) {
        const actualSign = e.target.dataset.key;
        if (this.data.checkFlagDot(actualSign)) return
        if (this.data.checkZeroWithDot(actualSign)) return
        if (this.data.checkIfIsDot(actualSign)) this.data.setFlag()
        if (this.data.checkSignOperation(actualSign)) {
            this.data.addToStorage(actualSign)
            Screen.show(this.data.getActualStorage())
        }
        if (this.data.checkActualSign(actualSign)) this.data.clearFlag()
        this.data.addToBeforeSign(actualSign)
    }

    scoreF() {
        if (this.data.checkBeforeSignIsOperation()) return
        const result = eval(this.data.getActualStorage())
        Screen.show(result)
        this.data.clearStorage()
        this.data.clearFlag()
        this.data.addToStorage(result)
    }
    acF() {
        Screen.show("0")
        this.data.clearStorage()
        this.data.clearFlag()
    }
}
const calculator = new Calculator()