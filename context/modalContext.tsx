import { createContext, useState } from "react";

// 定義 modal 的型別
interface ModalContextProps {
  modal: string;
  toggleModal: () => void; // 新增 toggleModal 方法
}

// 創建 ModalContext
const ModalContext = createContext<ModalContextProps | null>(null);

// 創建 ModalContextProvider
const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState("");

  // toggleModal 方法，用於切換 modal 的狀態
  const toggleModal = () => {
    setModal((prevModal) => (prevModal ? "" : "open"));
  };

  return (
    <ModalContext.Provider value={{ modal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
