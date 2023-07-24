import React, { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <div className="flex h-screen overflow-hidden">
      <Navigation />

      <div className="relative w-full overflow-y-auto">
        <main style={{ minHeight: "calc(100vh - 5rem)" }}>
          {props.children}
        </main>

        <Footer />
      </div>
    </div>
  </>
);

export default Layout;
