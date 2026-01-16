export interface Filters {
    priceFrom?: number;
    priceTo?: number;
    isFree: boolean;

    dateFrom?: string;
    dateTo?: string;

    timeFrom?: string;
    timeTo?: string;

    categories: Set<string>;
}