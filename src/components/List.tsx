import clsx from "clsx";

export type ListProps<T> = {
  items: T[];
  isLoading?: boolean;
  isFetching?: boolean;
  renderItem: (item: T) => React.ReactNode;
};
export const List = <T,>({
  items,
  isLoading = false,
  isFetching = false,
  renderItem,
}: ListProps<T>) => {
  return (
    <div className={clsx("flex flex-col", isFetching && "opacity-70")}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        items.map((item) => (
          <div
            key={(item as any).id}
            className="p-2 border-b-2 border-stone-300/20"
          >
            {renderItem(item)}
          </div>
        ))
      )}
    </div>
  );
};
