import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Head>
      <title>setsun.xyz</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌅</text></svg>" />
    </Head>

    <div className="flex h-screen overflow-hidden">
      <Navigation />

      <div className="w-full overflow-scroll relative">
        <main className="p-4" style={{ minHeight: 'calc(100vh - 4rem)'}}>
          {props.children}
        </main>

        <Footer />
      </div>
    </div>
  </>
);

export default Layout;
