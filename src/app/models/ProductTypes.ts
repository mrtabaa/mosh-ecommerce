export interface ProductTypeCategory {
    typeCatDict: {
        [type: string]: ProductTypeCategory[]
    };
}
