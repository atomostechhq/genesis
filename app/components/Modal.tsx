// import React, { ReactNode } from "react";
// import { RiCloseLine } from "@remixicon/react";

// interface ModalProps {
//   children?: ReactNode;
//   showModal?: boolean;
//   closeModal?: boolean;
//   setShowModal?: any;
//   closeOnOutsideClick?: boolean;
// }

// export default function Modal({
//   children,
//   showModal,
//   setShowModal,
//   closeModal = true,
//   closeOnOutsideClick = true,
// }: ModalProps) {
//   const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget && closeOnOutsideClick) {
//       setShowModal(false);
//     }
//   };
//   return (
//     <>
//       {showModal && (
//         <div onClick={handleClickOutside} className="w-full h-full bg-backdrop bg-blend-overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[1000000] overflow-hidden">
//           <div className="relative bg-primary-400 shadow-boxShadow rounded-xl p-[18px] transition-all duration-150 fade-in-grow">
//             <div>{children}</div>
//             {closeModal && (
//               <div
//                 className="absolute top-4 ml-5 right-5 z-10 shadow-backdrop rounded-full text-primary cursor-pointer hover:bg-primaryLight"
//                 onClick={() => setShowModal((prev: boolean) => !prev)}
//               >
//                 <RiCloseLine size={24} />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import React, { ReactNode, useEffect } from "react";
import { RiCloseLine } from "@remixicon/react";

interface ModalProps {
  children?: ReactNode;
  showModal?: boolean;
  closeModal?: boolean;
  setShowModal: (value: boolean) => void;
  closeOnOutsideClick?: boolean;
  className?: string;
}

export default function Modal({
  children,
  showModal,
  setShowModal,
  closeModal = true,
  closeOnOutsideClick = true,
  className = "", // Default to empty string if no custom class is provided
}: ModalProps) {
  // Disable body scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
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
            className={`relative bg-white shadow-boxShadow rounded-xl p-[18px] transition-all duration-150 fade-in-grow w-[50%] mx-4 ${className}`}
          >
            <div>{children}</div>
            {closeModal && (
              <div
                className="absolute top-4 ml-5 right-5 z-10 shadow-backdrop rounded-full text-primary cursor-pointer hover:bg-primaryLight"
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

