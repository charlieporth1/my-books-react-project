export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export function filterNil(value) {
    return !!(value);
}

export const arrayToString = (array, replacementText = ' ') => {
    const arrayString = array
        .toString()
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .join(replacementText);
    return arrayString;
};

//Remove an item or index from an array
// Used as ArrayRemove([1,2,4],4)
export const arrayRemove = (self: any[], object: any): any[] => {
    return self.filter((item) => object !== item);
};
export const arrayRemoveById = (self: any[], object: any): any[] => {
    return self.filter((item) => object.id !== item.id);
};