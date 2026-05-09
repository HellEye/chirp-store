import { Link, useLocation } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import { buttonVariants } from "./ui/button";

type NavItem = {
  name: string;
  to: string;
};
const navigation = [
  { name: "Artists", to: "/artists" },
  { name: "Albums", to: "/albums" },
] as const satisfies NavItem[];

const NavLink = ({ item }: { item: NavItem }) => {
  const location = useLocation();
  const active = location.pathname === item.to;
  return (
    <Link
      key={item.name}
      to={item.to}
      disabled={active}
      className={buttonVariants({
        variant: "default",
        size: "default",
      })}
    >
      {item.name}
    </Link>
  );
};
export default function Header() {
  return (
    <>
      <header className="p-4 flex items-center bg-stone-700 text-white shadow-lg">
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <span className="font-bold text-3xl font-sans">Chirp</span> Store
          </Link>
        </h1>

        <nav className="ml-12 flex flex-row gap-4">
          {navigation.map((item) => {
            return <NavLink key={item.name} item={item} />;
          })}
        </nav>

        <div className="ml-auto">
          <CartDrawer />
        </div>
      </header>
    </>
  );
}
