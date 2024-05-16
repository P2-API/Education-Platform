

// Deep copy an object
const deepCopy = <T>(obj: T): T => {
    if (obj == undefined) return obj; // Nothing to copy
    if (obj == null) return obj; // Nothing to copy

    return JSON.parse(JSON.stringify(obj)); // Deep copy
}

export default deepCopy;