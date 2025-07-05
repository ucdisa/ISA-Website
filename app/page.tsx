import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full">
      <p>Welcome to the ISA website</p>
      <Link href="/login">
        <button>Click to Login</button>
      </Link>
    </div>
  );
}
