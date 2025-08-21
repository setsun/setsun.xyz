import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="h-screen w-screen flex items-center justify-center p-24">
      <h1 className="font-inter text-4xl tracking-[0.5rem] uppercase">
        I am Setsun
      </h1>
    </main>
  );
}
