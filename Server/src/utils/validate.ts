export function isEmpty(value: any): boolean {
    return value === undefined || value === null || value === '';
}

export function isEmail(value: any): boolean {
    return value && value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
}

export function isPhone(value: any): boolean {
    return value && value.match(/^[0-9]{10}$/);
}

export function isStrongPassword(value: any): boolean {
    // strong password: at least 10 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    return value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/);
}
export function isPassword(value: any): boolean {
    return value && value.length >= 10;
}
