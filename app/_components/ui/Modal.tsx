import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import { X } from 'lucide-react';

type ModalType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  title?: string;
  titleClassName?: string;
  modalContainerClassName?: string;
  childrenContainerClassName?: string;
  iconClassName?: string;
};
const Modal: React.FC<ModalType> = ({
  isOpen,
  setIsOpen,
  children,
  title,
  titleClassName,
  modalContainerClassName,
  childrenContainerClassName,
  iconClassName,
}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[100000]'
      >
        <div
          className={`fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-2 ${modalContainerClassName}`}
        >
          <DialogPanel
            className={`ax-w-lg relative max-h-[90vh] w-full min-w-[200px] max-w-[90vw] space-y-4 overflow-y-scroll rounded-md border bg-white p-4 pt-6 shadow-xl md:max-w-[800px] ${childrenContainerClassName}`}
          >
            <button
              className={`absolute right-2 top-2 w-fit rounded-full p-1 text-red-500 hover:bg-red-500/[.1] ${iconClassName}`}
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            {title && (
              <DialogTitle
                className={`text-primary text-center text-xl font-bold ${titleClassName}`}
              >
                {title}
              </DialogTitle>
            )}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
