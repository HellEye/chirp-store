import { createFileRoute } from "@tanstack/react-router";
import { AlbumList } from "../components/AlbumList";
import { Container } from "../components/Container";
import { listAllAlbums } from "../query/albums";
import { usePaginatedQuery } from "../query/paginatedQuery";

export const Route = createFileRoute("/albums")({
  component: RouteComponent,
});

function RouteComponent() {
  const paginatedAlbums = usePaginatedQuery(listAllAlbums);

  if (paginatedAlbums.query.isLoading) return <div>Loading...</div>;
  return (
    <Container>
      <h3 className="text-2xl mb-2">All Albums</h3>
      <AlbumList paginatedAlbums={paginatedAlbums} />
    </Container>
  );
}
