import Link from "next/link";

const getYear = () => {
  const date = new Date();

  return date.getFullYear();
};

const Footer = () => {
  return (
    <footer>
      <div>
        Copyright &copy; {getYear()}. Written by{" "}
        <Link href="http://isaiahvickers.online" target="blank">
          Isaiah Vickers
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
