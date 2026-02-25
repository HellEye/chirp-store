import { createFileRoute } from "@tanstack/react-router";
import { usePaginatedQuery } from "../query/paginatedQuery";
import { getArtistById, listArtistAlbums } from "../query/artists";
import { useQuery } from "@tanstack/react-query";
import { PaginatedList } from "../components/PaginatedList";
import type { Album } from "../types/album";
import { Container } from "../components/Container";
import { AddToCart } from "../components/ui/addToCartButton";
import { AlbumList } from "../components/AlbumList";

export const Route = createFileRoute("/artists_/$artistId")({
  component: RouteComponent,
  loader: async (ctx) => {
    const { artistId } = ctx.params;
    await ctx.context.queryClient.ensureQueryData(getArtistById(artistId));
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const artist = useQuery(getArtistById(params.artistId));
  const paginatedAlbums = usePaginatedQuery(listArtistAlbums(params.artistId));

  if (artist.isLoading) return <div>Loading...</div>;
  return (
    <Container>
      <h2 className="text-3xl mb-4">{artist.data?.name}</h2>
      <h3 className="text-2xl mb-2">Albums</h3>
      <AlbumList paginatedAlbums={paginatedAlbums} />
    </Container>
  );
}
