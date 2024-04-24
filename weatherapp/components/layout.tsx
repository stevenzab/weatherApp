import Navbar from './navbar'
import Footer from './footer'
import "../src/app/globals.css";
import React, { PropsWithChildren } from "react";


export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}


