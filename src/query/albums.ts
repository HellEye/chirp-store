import {
  paginatedQueryOptions,
  type PaginatedResponse,
} from "./paginatedQuery";
import type { Album, AlbumWithTracks } from "../types/album";
import { client } from "./api";
import { queryOptions } from "@tanstack/react-query";

export const listAllAlbums = paginatedQueryOptions({
  queryKey: ["albums"] as const,
  queryFn: async (ctx) => {
    const [, params] = ctx.queryKey;
    const response = await client.get<PaginatedResponse<Album>>("/albums", {
      params,
      signal: ctx.signal,
    });
    return response.data;
  },
});

export const getAlbumById = (albumId: string) =>
  queryOptions({
    queryKey: ["album", albumId] as const,
    queryFn: async (ctx) => {
      const [, albumId] = ctx.queryKey;
      const response = await client.get<AlbumWithTracks>(`/albums/${albumId}`, {
        signal: ctx.signal,
      });
      return response.data;
    },
  });
