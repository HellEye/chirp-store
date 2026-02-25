import { queryOptions, useMutation } from "@tanstack/react-query";
import { client } from "./api";
import type { Cart } from "../types/cart";

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
    onSuccess(data, variables, onMutateResult, context) {
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
    onSuccess(data, variables, onMutateResult, context) {
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
    onSuccess(data, variables, onMutateResult, context) {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
