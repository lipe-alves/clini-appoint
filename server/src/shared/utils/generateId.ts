import { ID } from "@root/shared/types/index";

function generateId(size = 10): ID {
    const digits = "0123456789";
    let id =  "";

    for (let i = 0; i < size; i++) {
        id += digits[Math.floor(Math.random() * digits.length)];
    }

    return id as ID;
}

export default generateId;
export { generateId };