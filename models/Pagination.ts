export interface Pagination {
    totalItems: number | null;
    pageSize: number | null;
    firstPage: number | null;
    currentPage: number | null;
    previousPage: number | null;
    nextPage: number | null;
    endPage: number | null;
}