import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import type { PaginatedQueryResult } from "../query/paginatedQuery";
import { List } from "./List";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

export type FilterOptions = {
  sortingOptions?: { label: string; value: string }[];
};
export type PaginatedListProps<T> = PaginatedQueryResult<T> &
  FilterOptions & {
    renderItem: (item: T) => React.ReactNode;
  };


const PaginationFilters = ({
  setters,
  params,
  sortingOptions,
}: Pick<PaginatedQueryResult<any>, "setters" | "params"> & FilterOptions) => {
  return (
    <div className="flex flex-row gap-4">
      <Input
        className="max-w-3xs"
        type="search"
        placeholder="Search..."
        value={params.search}
        onChange={(e) => {
          setters.setSearch(e.target.value);
        }}
      />
      {sortingOptions && (
        <Select
          value={`${params.sort}-${params.order}`}
          onValueChange={(value) => {
            const [sort, order] = value.split(";");
            setters.setSort(sort);
            setters.setOrder(order as "asc" | "desc");
          }}
        >
          <SelectTrigger>
            {!params.sort ? (
              "Sort By"
            ) : (
              <>
                {
                  sortingOptions.find((option) => option.value === params.sort)
                    ?.label
                }{" "}
                {params.order === "asc" ? <ArrowBigUp /> : <ArrowBigDown />}
              </>
            )}
          </SelectTrigger>
          <SelectContent position="popper" align="end">
            {sortingOptions.map((option) => (
              <Fragment key={option.value}>
                <SelectItem value={`${option.value};asc`}>
                  {option.label} <ArrowBigUp className="ml-auto" />
                </SelectItem>

                <SelectItem value={`${option.value};desc`}>
                  {option.label} <ArrowBigDown className="ml-auto" />
                </SelectItem>
              </Fragment>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

const PaginationControls = ({
  params,
  setters,
  query,
}: Pick<PaginatedListProps<any>, "params" | "setters" | "query">) => {
  if (query.isLoading) return null;
  return (
    <div className="flex items-center justify-between p-2 self-center w-auto gap-2">
      <Button
        size="sm"
        disabled={params.page <= 1}
        onClick={() => setters.setPage(1)}
      >
        &lt;&lt;&lt;
      </Button>
      <Button
        size="sm"
        disabled={params.page <= 1}
        onClick={() => setters.setPage(params.page - 1)}
      >
        &lt;
      </Button>
      <span>
        Page {params.page}/{query.data ? query.data.totalPages : "?"}
      </span>
      <Button
        size="sm"
        disabled={
          !!(params.page >= (query.data ? query.data.totalPages : Infinity))
        }
        onClick={() => setters.setPage(params.page + 1)}
      >
        &gt;
      </Button>
      <Button
        size="sm"
        disabled={
          !!(params.page >= (query.data ? query.data.totalPages : Infinity))
        }
        onClick={() =>
          setters.setPage(query.data ? query.data.totalPages : params.page)
        }
      >
        &gt;&gt;&gt;
      </Button>
    </div>
  );
};

export const PaginatedList = <T,>({
  query,
  params,
  setters,
  renderItem,
  sortingOptions,
}: PaginatedListProps<T>) => {
  return (
    <div className="flex flex-col gap-4">
      <PaginationFilters
        params={params}
        setters={setters}
        sortingOptions={sortingOptions}
      />
      <List
        items={query.data?.items ?? []}
        isLoading={query.isLoading}
        isFetching={query.isFetching}
        renderItem={renderItem}
      />

      <PaginationControls params={params} setters={setters} query={query} />
    </div>
  );
};
