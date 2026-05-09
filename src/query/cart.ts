import { queryOptions, useMutation } from "@tanstack/react-query";
import type { Cart } from "../types/cart";
import { client } from "./api";

export const getCart = queryOptions({
  queryKey: ["cart"] as const,
  queryFn: async (ctx) => {
    const response = await client.get<Cart>("/cart", { signal: ctx.signal });
    return response.data;
  },
});

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["cart", "add"],
    mutationFn: async (productId: number | string) => {
      const res = await client.post("/cart", {
        albumId: productId,
        quantity: 1,
      });
      console.log(res);
      return res;
    },
    onSuccess(_data, _variables, _onMutateResult, context) {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationKey: ["cart", "remove"],
    mutationFn: async (productId: string | number) => {
      return await client.delete(`/cart/${productId}`);
    },
    onSuccess(_data, _variables, _onMutateResult, context) {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

const mockProcessPayment = async () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

export const useProcessPayment = () => {
  return useMutation({
    mutationKey: ["cart", "processPayment"],
    mutationFn: async () => {
      await mockProcessPayment();
      return await client.delete("/cart");
    },
    onSuccess(_data, _variables, _onMutateResult, context) {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
