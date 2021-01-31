if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}

export const emailValidation = value => {
    let errors = []
    if (!value) {
        errors.push("Email cannot be empty!")
    }
    if (!value.includes("@")) {
        errors.push("Email must contain @!")
    }
    return errors
}

export const passwordValidation = value => {
    let errors = []
    if (value.length < 8) {
        errors.push("Password must be at least 8 characters long!")
    }
    return errors
}

export const passwordRepeatValidation = (password, passwordRepeat) => {
    let errors = []
    if (password !== passwordRepeat) {
        errors.push("Passwords don't match!")
    }
    return errors
}
