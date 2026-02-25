import { useQuery } from "@tanstack/react-query";
import { getCart, useRemoveFromCart } from "../query/cart";
import { ShoppingCart, Trash } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button, buttonVariants } from "./ui/button";
import type { CartItem } from "../types/cart";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const CartItemComponent = ({ item }: { item: CartItem }) => {
  const removeMutation = useRemoveFromCart();
  return (
    <div className="flex flex-row gap-2 items-center">
      <img
        src={item.album.albumCoverUrl}
        alt={item.album.name}
        className="w-8 h-8 object-cover rounded"
      />
      <div className="flex flex-col">
        <span className="font-medium">{item.album.name}</span>
        <span className="text-sm text-muted-foreground">
          Quantity: {item.quantity}
        </span>
      </div>
      <span className="ml-auto font-medium">
        {(item.album.price * item.quantity).toFixed(2)}zł
      </span>
      <Button
        size="icon"
        variant="destructive"
        onClick={() => removeMutation.mutate(item.album.id)}
      >
        <Trash />
      </Button>
    </div>
  );
};
export const CartDrawer = () => {
  const query = useQuery(getCart);
  const items = query.data?.items || [];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className={`${buttonVariants({ size: "icon" })} relative`}>
        <ShoppingCart />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {items.length}
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-3xl">Cart</DrawerTitle>
        </DrawerHeader>
        {items.length === 0 ? (
          <div className="p-4">Your cart is empty.</div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {items.map((item) => (
              <CartItemComponent item={item} key={item.album.id} />
            ))}
          </div>
        )}
        <DrawerFooter>
          <div className="w-full flex flex-row gap-16 items-center">
            <span className="text-lg font-medium">
              Total: {query.data?.totalPrice?.toFixed(2) ?? "0.00"}zł
            </span>
            <Link
              onClick={() => {
                setIsOpen(false);
              }}
              className={buttonVariants({ size: "lg" })}
              to="/checkout"
            >
              Checkout
            </Link>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
