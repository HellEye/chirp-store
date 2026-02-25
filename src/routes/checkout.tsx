import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getCart, useProcessPayment } from "../query/cart";
import { Container } from "../components/Container";
import { Button, LoadingButton } from "../components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const cartQuery = useQuery(getCart);
  const paymentMutation = useProcessPayment();
  const navigate = useNavigate();

  function mockProcessPayment() {
    paymentMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Payment processed successfully!");
        navigate({ to: "/" });
      },
    });
  }

  return (
    <Container>
      <h2 className="text-3xl ">Checkout</h2>
      <div className="mt-6">
        {cartQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          cartQuery.data &&
          cartQuery.data?.items.map((item) => (
            <div
              key={item.album.id}
              className="flex items-center space-x-8 mb-4"
            >
              <img
                src={item.album.albumCoverUrl}
                alt={item.album.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.album.name}</h3>
                <p className="text-sm text-stone-400">
                  {item.album.artistName} &#8226; {item.album.releaseYear}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-auto">
                <span className="text-sm text-right text-stone-500">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm text-right text-stone-500">
                  {item.album.price.toFixed(2)}zł
                </span>
              </div>
              <span className="w-32 text-right font-medium">
                {(item.album.price * item.quantity).toFixed(2)}zł
              </span>
            </div>
          ))
        )}
        <div className="flex flex-row mt-12 gap-4 items-center">
          <span className="font-medium text-lg">
            Total: {cartQuery.data?.totalPrice.toFixed(2) ?? "0.00"}zł
          </span>
          <LoadingButton
            size="lg"
            className="w-32"
            isLoading={paymentMutation.isPending}
            onClick={mockProcessPayment}
          >
            Place Order
          </LoadingButton>
        </div>
      </div>
    </Container>
  );
}
