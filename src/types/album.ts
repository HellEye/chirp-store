import type { Song } from "./song";

export type Album = {
  id: number;
  name: string;
  releaseYear: number;
  albumCoverUrl: string;
  artistName: string;
  price: number;
};

export type AlbumWithTracks = Album & {
  songs: Array<Song>;
};
