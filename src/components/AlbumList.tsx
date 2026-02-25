import { Link } from "@tanstack/react-router";
import type { PaginatedQueryResult } from "../query/paginatedQuery";
import type { Album } from "../types/album";
import { PaginatedList } from "./PaginatedList";
import { AddToCart } from "./ui/addToCartButton";

function renderAlbumRow(album: Album) {
  return (
    <div className="flex items-center space-x-8">
      <img
        src={album.albumCoverUrl}
        alt={album.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <Link to="/albums/$albumId" params={{ albumId: album.id.toString() }}>
          <h3 className="text-lg font-semibold">{album.name}</h3>
        </Link>
        <p className="text-sm text-stone-400">
          {album.artistName} &#8226; {album.releaseYear}
        </p>
      </div>
      <AddToCart className="ml-auto" item={album} />
    </div>
  );
}

const AlbumSortingOptions = [
  { label: "Name", value: "name" },
  { label: "Release Year", value: "releaseYear" },
  { label: "Price", value: "price" },
];

export const AlbumList = ({
  paginatedAlbums,
}: {
  paginatedAlbums: PaginatedQueryResult<Album>;
}) => {
  return (
    <PaginatedList
      {...paginatedAlbums}
      renderItem={renderAlbumRow}
      sortingOptions={AlbumSortingOptions}
    />
  );
};
