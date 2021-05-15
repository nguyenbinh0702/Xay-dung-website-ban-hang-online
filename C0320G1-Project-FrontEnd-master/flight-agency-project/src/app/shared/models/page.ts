export interface Page<T>{
    content: T[],
    pageable: any,
    totalPages: number,
    totalElements: number, 
    last: number, 
    size: number, 
    sort: any, 
    numberOfElements: number,
    first: boolean,
    empty: boolean,
    number : number;
}