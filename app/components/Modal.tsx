import React, { ReactNode } from "react";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

interface ModalProps {
  children?: ReactNode;
  showModal?: boolean;
  closeModal?: boolean;
  setShowModal?: any;
}

export default function Modal({
  children,
  showModal,
  setShowModal,
  closeModal = true,
}: ModalProps) {
  return (
    <>
      {showModal && (
        <div className="w-full h-full bg-backdrop bg-blend-overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[1000] overflow-hidden">
          <div className="relative bg-white shadow-boxShadow rounded-xl p-[18px] transition-all duration-700 ease-in-out">
            <div>{children}</div>
            {closeModal && (
              <div
                className="absolute top-4 ml-5 right-5 z-10 shadow-backdrop rounded-full text-primary cursor-pointer hover:bg-primaryLight"
                onClick={() => setShowModal((prev: boolean) => !prev)}
              >
                <CloseLineIcon size={24} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
