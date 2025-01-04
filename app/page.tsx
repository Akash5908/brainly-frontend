"use client";
import { signIn, signOut } from "next-auth/react";
import Card from "./component/ui/card";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();

  return (
    <div
    // style={{
    //   width: "100vw",
    //   height: "100vh",
    //   backgroundImage: `url(${"../public/topography.svg"})`,
    //   backgroundSize: "cover",
    // }}
    >
      {/* <Image
        src="../public/topography.svg"
        alt="Descriptive text for screen readers"
        // className="w-full"
        width={"900"}
        height={300}
        // layout="responsive"
      /> */}
      <h1>Hello world</h1>
      {data && <button onClick={() => signIn()}>signIn</button>}
      {data && <button onClick={() => signOut()}>signOut</button>}
      {data && <p>{JSON.stringify(data)}</p>}

      <Card />
    </div>
  );
}
