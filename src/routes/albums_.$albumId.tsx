import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Container } from "../components/Container";
import { List } from "../components/List";
import { getAlbumById } from "../query/albums";
import type { Song } from "../types/song";

export const Route = createFileRoute("/albums_/$albumId")({
  component: RouteComponent,
  loader: async (ctx) => {
    const { albumId } = ctx.params;
    await ctx.context.queryClient.ensureQueryData(getAlbumById(albumId));
  },
});
function renderSong(song: Song) {
  return (
    <div className="flex flex-row items-center">
      <span className="w-4">{song.albumOrder}</span>
      <span className="ml-4">{song.title}</span>
    </div>
  );
}
function RouteComponent() {
  const albumId = Route.useParams().albumId;
  const albumQuery = useQuery(getAlbumById(albumId));
  if (albumQuery.isLoading) return <div>Loading...</div>;
  return (
    <Container>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl mb-4">{albumQuery.data?.name}</h2>
          <h3 className="text-xl">{albumQuery.data?.artistName}</h3>
        </div>
        <List items={albumQuery.data?.songs ?? []} renderItem={renderSong} />
      </div>
    </Container>
  );
}
