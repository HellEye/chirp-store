import { queryOptions } from "@tanstack/react-query";
import { client } from "./api";
import type { Artist } from "../types/artist";
import {
  paginatedQueryOptions,
  type PaginatedResponse,
} from "./paginatedQuery";
import type { Album } from "../types/album";

export const listArtists = paginatedQueryOptions({
  queryKey: ["artists"] as const,
  queryFn: async (ctx) => {
    const [, params] = ctx.queryKey;
    const response = await client.get<PaginatedResponse<Artist>>("/artists", {
      params,
      signal: ctx.signal,
    });
    return response.data;
  },
});

export const listArtistAlbums = (artistId: string) =>
  paginatedQueryOptions({
    queryKey: ["artist", artistId, "albums"] as const,
    queryFn: async (ctx) => {
      const [, artistId, , params] = ctx.queryKey;
      const response = await client.get<PaginatedResponse<Album>>(
        `/artists/${artistId}/albums`,
        {
          params,
          signal: ctx.signal,
        }
      );
      return response.data;
    },
  });

export const getArtistById = (artistId: string) =>
  queryOptions({
    queryKey: ["artist", artistId] as const,
    queryFn: async (ctx) => {
      const [, artistId] = ctx.queryKey;
      const response = await client.get<Artist>(`/artists/${artistId}`, {
        signal: ctx.signal,
      });
      return response.data;
    },
  });
