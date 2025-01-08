import { Session } from "next-auth";

interface CustomSession extends Session {
  accessToken?: string;
}

export type { CustomSession };

export interface IconProps {
  size: string;
  fun?: any;
}

export interface cardInterface {
  title: string;
  describtion: string;
  tags: string[];
  link: string;
  id: string;
}
