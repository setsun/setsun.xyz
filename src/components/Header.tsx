import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="p-2 flex gap-2 justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">☀️</Link>
        </div>
      </nav>
    </header>
  );
}
