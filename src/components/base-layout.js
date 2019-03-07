import React from "react";

import Header from "./header";
import Footer from "./footer";
import "../styles/main.scss";

const BaseLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default BaseLayout;
