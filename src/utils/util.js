export function onlyUnique(value:any, index:number, self:any[]) {
    return self.indexOf(value) === index;
}

export function filterNil(value:any) {
    return !!(value);
}

export const arrayToString = (array:[] = [], replacementText:string = ' ') => {
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

export const simpleQueryBooks = (self: any[] = [], queryParam: string, query: string = '') => {
    return self.filter(book => String(book[queryParam] || '').toString().toLowerCase().includes((query || '').toLowerCase()));
};