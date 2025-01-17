"use client";
import { IconProps } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const YoutubeIcon = (props: IconProps) => {
  const size = `h-${props.size}`;
  const router = useRouter();
  const pathName = usePathname();

  //   const params = new URLSearchParams(pathName.toString());
  return (
    <div
      onClick={() => {
        router.push(`${pathName}?type=youtube`);
      }}
      className="sidebarstyle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-youtube ${size}`}
        stroke="currentColor"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
        "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0
        1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25
        0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25
        2.25Z"
      </svg>

      {props.text && <p className="font-medium">{props.text}</p>}
    </div>
  );
};

export default YoutubeIcon;
