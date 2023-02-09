class HTTPErrors extends Error { //create child class of error class
    constructor(message, status) {
        super(message); //use properties of parent class
        this.status = status;
        this.message = message;
    }
}
module.exports = HTTPErrors;