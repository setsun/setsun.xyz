import Head from "next/head";
import React, { ReactNode } from "react";
import styled from 'styled-components';
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const LayoutContainer = styled.div`
  padding: 0 2rem;
`;

const Layout: React.FC<Props> = (props) => (
  <>
    <Head>
      <title>setsun.xyz</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌅</text></svg>" />
    </Head>

    <Header />

    <LayoutContainer>{props.children}</LayoutContainer>

    <Footer />
  </>
);

export default Layout;
