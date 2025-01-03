import Image from "next/image";
import Card from "./component/ui/card";

export default function Home() {
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
      <Card />
    </div>
  );
}
