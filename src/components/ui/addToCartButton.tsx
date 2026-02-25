import { useQuery } from "@tanstack/react-query";
import { getCart, useAddToCart } from "../../query/cart";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";
import type { Album } from "../../types/album";

export const AddToCart = ({
  item,
  className,
}: {
  item: Album;
  className?: string;
}) => {
  const addMutation = useAddToCart();
  const cartQuery = useQuery(getCart);
  const itemInCart = cartQuery.data?.items.find(
    (cartItem) => cartItem.album.id === item.id
  ) ?? { quantity: 0 };
  return (
    <Button
      className={twMerge(className, "relative w-24")}
      onClick={() => addMutation.mutate(item.id)}
    >
      {item.price.toFixed(2)}zł
      {itemInCart?.quantity > 0 && (
        <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
          {itemInCart?.quantity}
        </span>
      )}
    </Button>
  );
};
