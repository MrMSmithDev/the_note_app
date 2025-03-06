import { useEffect, useRef } from 'react';

export interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const Modal: React.FC<ModalProps> = ({ btnRef, closeModal, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        function closeModalCallBack(e: MouseEvent) {
          const modal = ref.current;
          const btn = btnRef.current;

          if (
            modal &&
            !modal.contains(e.target as Node) &&
            btn &&
            !btn.contains(e.target as Node)
          ) {
            closeModal();
            document.removeEventListener('click', closeModalCallBack, true);
          }
        }

        document.addEventListener('click', closeModalCallBack, true);
        return () => document.removeEventListener('click', closeModalCallBack, true);
      }
    });
  });

  return (
    <div className="p-1 fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center animate-fade-in">
      <div ref={ref} className="modal-children">
        {children}
      </div>
    </div>
  );
};

export default Modal;
