import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlbumList } from "../components/AlbumList";
import { Container } from "../components/Container";
import { getArtistById, listArtistAlbums } from "../query/artists";
import { usePaginatedQuery } from "../query/paginatedQuery";

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
