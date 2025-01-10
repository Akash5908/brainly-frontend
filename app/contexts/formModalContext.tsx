import { fromModal } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

const FormModal = createContext<fromModal | false>(false);

export const FormModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState({
    formState: false,
    cardId: "",
  });
  const formShow = () => {
    setModalState((prev) => !prev);
  };

  const editForm = (id: string) => {
    setEditModalState({
      cardId: id,
      formState: !editModalState.formState,
    });
  };

  return (
    <FormModal.Provider
      value={{
        modalState,
        formShow,
        editModalState: editModalState,
        editModalFun: editForm,
      }}
    >
      {children}
    </FormModal.Provider>
  );
};

export const useFormModal = () => {
  const context = useContext(FormModal);
  if (!context) {
    throw Error("Component must wrap into the FormModalProvider");
  }
  return context;
};
