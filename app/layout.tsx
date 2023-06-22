"use client";
import { Inter } from "next/font/google";
import { ChakraProvider, border } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Navbar />
          {children}
          <Footer/>
          <ToastContainer />
        </ChakraProvider>
      </body>
    </html>
  );
}
