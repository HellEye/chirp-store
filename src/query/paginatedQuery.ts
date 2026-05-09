import {
  useQuery,
  type QueryKey,
  type QueryOptions
} from "@tanstack/react-query";
import { useCallback, useState } from "react";
export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
};
export type PaginationParams = {
  page: number;
  pageSize: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
};

const defaultPagination: PaginationParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sort: "",
  order: "asc",
};
export const paginatedQueryOptions = <
  TData,
  TQueryKey extends readonly unknown[]
>(
  options: Omit<
    QueryOptions<
      PaginatedResponse<TData>,
      Error,
      PaginatedResponse<TData>,
      readonly [...TQueryKey, PaginationParams]
    >,
    "queryKey"
  > & { queryKey: TQueryKey }
) => {
  return options;
};
const cleanParams = (params: PaginationParams): PaginationParams => {
  return {
    page: params.page,
    pageSize: params.pageSize,
    ...(params.search ? { search: params.search } : {}),
    ...(params.sort ? { sort: params.sort } : {}),
    ...(params.order && params.order != "asc" ? { order: params.order } : {}),
  };
};

export type PaginatedQueryOptions<
  TData,
  TQueryKey extends readonly unknown[]
> = ReturnType<typeof paginatedQueryOptions<TData, TQueryKey>>;
export const usePaginatedQuery = <TData, TQueryKey extends QueryKey>(
  options: Omit<
    QueryOptions<
      PaginatedResponse<TData>,
      Error,
      PaginatedResponse<TData>,
      readonly [...TQueryKey, PaginationParams]
    >,
    "queryKey"
  > & { queryKey: readonly [...TQueryKey] },
  initialParams?: Partial<PaginationParams>
) => {
  const [params, setParams] = useState<PaginationParams>({
    ...defaultPagination,
    ...initialParams,
  });

  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page: page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setParams((prev) => ({ ...prev, pageSize: pageSize, page: 1 }));
  }, []);
  const setSort = useCallback((sort: string) => {
    setParams((prev) => ({ ...prev, sort: sort, page: 1 }));
  }, []);
  const setSearch = useCallback((search: string) => {
    setParams((prev) => ({ ...prev, search: search, page: 1 }));
  }, []);
  const setOrder = useCallback((order: "asc" | "desc") => {
    setParams((prev) => ({ ...prev, order: order, page: 1 }));
  }, []);
  const query = useQuery({
    ...options,
    queryKey: [...(options.queryKey ?? []), cleanParams(params)] as [
      ...TQueryKey,
      PaginationParams
    ],
  });
  return {
    params,
    setters: {
      setPage,
      setPageSize,
      setSort,
      setSearch,
      setOrder,
    },
    query,
  };
};

export type PaginatedQueryResult<T> = ReturnType<
  typeof usePaginatedQuery<T, any>
>;
