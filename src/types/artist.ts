import type { Album } from "./album";

export type Artist = {
  id: number;
  name: string;
  artistPhotoUrl: string;
};

export type ArtistWithAlbums = Artist & {
  albums: Album[];
};
