import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ToDo Next App",
  description: "A simple ToDo App - version 1.0.",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Nav />
        <main className={`app ${inter.className}`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
