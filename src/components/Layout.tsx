import React from "react";
import Header from "./Header"; // Your shared header component


interface LayoutProps {
    children: React.ReactNode; // This represents dynamic content inserted inside the main section
}

export default function Layout({ children }: Readonly<LayoutProps>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}