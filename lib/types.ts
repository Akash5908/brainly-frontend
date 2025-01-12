import { Session } from "next-auth";

interface CustomSession extends Session {
  accessToken?: string;
}

export type { CustomSession };

export interface IconProps {
  size: string;
  fun?: any;
  cardData?: cardInterface;
}

export interface cardInterface {
  type: string;
  title: string;
  describtion: string;
  tags: string[] | [];
  link: string;
  id?: string | null;
}

export interface fromModal {
  modalState: boolean;
  formShow: () => void;
  editModalState: { formState: boolean; cardId: string };
  editModalFun: (id: string) => void;
}
