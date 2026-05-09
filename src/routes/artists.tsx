import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "../components/Container";
import { PaginatedList, type FilterOptions } from "../components/PaginatedList";
import { listArtists } from "../query/artists";
import { usePaginatedQuery } from "../query/paginatedQuery";
import type { Artist } from "../types/artist";

export const Route = createFileRoute("/artists")({
  component: RouteComponent,
});
function renderArtistRow(artist: Artist) {
  return (
    <Link
      to="/artists/$artistId"
      params={{ artistId: artist.id.toString() }}
      className="flex items-center space-x-8"
    >
      <img
        src={artist.artistPhotoUrl}
        alt={artist.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">{artist.name}</h3>
      </div>
    </Link>
  );
}

const artistSortingOptions: FilterOptions["sortingOptions"] = [
  { label: "Name", value: "name" },
];
function RouteComponent() {
  const paginatedQuery = usePaginatedQuery(listArtists);
  return (
    <Container>
      <h2 className="text-3xl ">Artists</h2>
      <div className="mt-6">
        <PaginatedList
          {...paginatedQuery}
          renderItem={renderArtistRow}
          sortingOptions={artistSortingOptions}
        />
      </div>
    </Container>
  );
}
