import Image from "next/image";
import Anchor from "./{components}/Anchor";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <span className="flex items-center" style={{ fontSize: "1rem" }}>
        If you really like our product, you can buy it by visiting
        <Link href="/somewhere">
          <Anchor>this link</Anchor>
        </Link>
      </span>
    </main>
  );
}
