import Image from "next/image";
import Link from "next/link";

const getYear = () => {
  const date = new Date();

  return date.getFullYear();
};

const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row justify-center lg:justify-between items-center p-4 my-4 ">
      <div className="text-sm lg:text-base">
        Copyright &copy; {getYear()}. Written by{" "}
        <Link href="http://github.com/izzymadethat" target="blank">
          Isaiah Vickers
        </Link>
      </div>
      <Link href="/" className="flex_center gap-2">
        <Image src="assets/images/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-lg font-extrabold tracking-wider uppercase">dunno</p>
      </Link>
    </footer>
  );
};

export default Footer;
