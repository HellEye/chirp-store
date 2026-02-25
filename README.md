# Chirp store application

This is a demo application with basic access to a music store server.

## Functionality

- Listing select artists, albums (all albums + artist's albums) and songs per album
- Full pagination, filtering and sorting support for paginated views (that's a lie, check `Issues`)
- Basic cart handling (add albums to cart, remove from cart, count total)
- mocked payment processing with a simple delay

## Instructions

- `pnpm install` to download and install all the required packages (`npm install` should work as well)
- `pnpm dev` (or `npm run dev`) to run a development server locally

- Requires `VITE_API_URL` in .env, won't work locally without it.

## Implementation details

- Full Typescript support
- Built on top of Tanstack Router (using `pnpm create @tanstack/router`)
- Tanstack query for server state, including basic prefetching on link hovers
- Styled with tailwind and shadcn/ui
- Server implementation in c# available (here)[https://github.com/HellEye/SampleShopApi]

## Issues

- The project was a bit rushed, so the UX is bad
  - Forgot to add sorting/filtering, even though it's supported on the backend. Only search available for now
  - no loading states on most buttons
  - not great UI, no "amount" picker in cart or when adding an album
  - lists are ugly, I'm not a designer
