export interface Pagination {
    totalItems: number | null;
    pageSize: number | null;
    firstPage: number | null;
    currentPage: number | null;
    previousPage: number | null;
    nextPage: number | null;
    endPage: number | null;
}

export interface PaginationState {
  firstPage: number;
  previous: number | null;
  center: number;
  next: number | null;
  totalPages: number;
  perPage: number;
  currentPage: number;
  perPageOptions: number[];
}