import React from "react";

import Header from "./header";
import Footer from "./footer";

const BaseLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default BaseLayout;
