"use client";

import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
} from "@urql/next";

const ssr = ssrExchange();
const client = createClient({
  url: "http://localhost:3000/api/graphql",
  exchanges: [cacheExchange, ssr, fetchExchange],
});

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
