import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Navigation } from "@/components/Navigation";
import { LocalStorageInitializer } from "@/components/LocalStorageInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cannabis Order System",
  description: "Order management for Apotheke",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <LocalStorageInitializer />
            <Navigation />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
