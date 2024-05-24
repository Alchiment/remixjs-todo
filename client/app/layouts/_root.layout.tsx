import React from "react";
import NavbarMenu from "~/components/navs/navbar-menu/NavbarMenu";
import {Container} from "react-bootstrap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <NavbarMenu />
        <main className="layout_root-content">
            <Container>
                {children}
            </Container>
        </main>
    </>
  );
}