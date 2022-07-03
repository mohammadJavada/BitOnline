import { Container } from "@mui/system";
import React, { ReactChild, ReactFragment, ReactPortal } from "react";
import Header from "./Header";
import CS from "./index.module.scss";

interface LayoutProps {
  children:
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
}

const PageLayout = ({ children }: LayoutProps) => (
  <Container maxWidth="lg" className={`${CS.layout} dir`}>
    <Header />
    {children}
  </Container>
);

export default PageLayout;
