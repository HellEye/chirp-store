import type { Album } from "./album";

export type Cart = {
  id: string;
  items: Array<CartItem>;
  totalPrice: number;
};

export type CartItem = {
  album: Album;
  quantity: number;
};
