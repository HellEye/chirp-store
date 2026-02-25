import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "../logo.svg";
import type { Artist } from "../types/artist";
import { listArtists } from "../query/artists";
import { usePaginatedQuery } from "../query/paginatedQuery";
import { Container } from "../components/Container";
import { Button, buttonVariants } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-4xl font-bold">Chirp Store</h1>
        <div className="flex flex-row gap-16">
          <Link className={buttonVariants({ size: "lg" })} to="/artists">
            Browse Artists
          </Link>
          <Link className={buttonVariants({ size: "lg" })} to="/albums">
            Browse Albums
          </Link>
        </div>
      </div>
    </Container>
  );
}
