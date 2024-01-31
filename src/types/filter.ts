export enum FilterTypeEnum {
    All = 'all',
    Favorite = 'favorite'
}

export type FilterType = {
    type: FilterTypeEnum;
    label: string;
}