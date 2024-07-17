import React, { ReactNode } from "react";
import { RiCloseLine } from "@remixicon/react";

interface ModalProps {
  children?: ReactNode;
  showModal?: boolean;
  closeModal?: boolean;
  setShowModal?: any;
  closeOnOutsideClick?: boolean;
}

export default function Modal({
  children,
  showModal,
  setShowModal,
  closeModal = true,
  closeOnOutsideClick = true,
}: ModalProps) {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOutsideClick) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal && (
        <div onClick={handleClickOutside} className="w-full h-full bg-backdrop bg-blend-overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[1000000] overflow-hidden">
          <div className="relative bg-white shadow-boxShadow rounded-xl p-[18px] transition-all duration-150 fade-in-down">
            <div>{children}</div>
            {closeModal && (
              <div
                className="absolute top-4 ml-5 right-5 z-10 shadow-backdrop rounded-full text-primary cursor-pointer hover:bg-primaryLight"
                onClick={() => setShowModal((prev: boolean) => !prev)}
              >
                <RiCloseLine size={24} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
