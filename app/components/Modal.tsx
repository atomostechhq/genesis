"use client";
import React, { ReactNode, useEffect } from "react";
import { RiCloseLine } from "@remixicon/react";
import { cn } from "../utils/utils";

interface ModalProps {
  children?: ReactNode;
  showModal?: boolean;
  closeModal?: boolean;
  setShowModal: (value: boolean) => void;
  closeOnOutsideClick?: boolean;
  className?: string;
  width?: string;
}

export default function Modal({
  children,
  showModal,
  setShowModal,
  closeModal = true,
  closeOnOutsideClick = true,
  className = "",
  width = "50%",
}: ModalProps) {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOutsideClick) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div
          onClick={handleClickOutside}
          className="w-full h-full bg-backdrop bg-blend-overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[1000000] overflow-hidden"
        >
          <div
            style={{ width }}
            className={cn(
              "relative bg-white shadow-boxShadow rounded-xl p-[18px] transition-all duration-150 fade-in-grow mx-4",
              className
            )}
          >
            <div>{children}</div>
            {closeModal && (
              <div
                className="absolute top-4 ml-5 right-5 z-10 shadow-backdrop rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => setShowModal(false)}
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
