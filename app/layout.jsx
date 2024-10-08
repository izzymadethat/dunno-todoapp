import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dunno | ToDo App",
  description: "A simple ToDo App - version 1.0.0",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Nav />
        <main className={`${inter.className}`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
