


const deepCopy = <T>(obj: T): T => {
    if (obj == undefined) return obj;
    if (obj == null) return obj;

    return JSON.parse(JSON.stringify(obj));
}

export default deepCopy;