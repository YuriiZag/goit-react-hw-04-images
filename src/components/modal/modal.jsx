import { Backdrop, Modal } from './modal.styled';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import { useEffect } from 'react';


const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = ({ onClose, children }) => {
  
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const onClickHandle = e => {
    onClose();
    
  };

  return createPortal(
    <Backdrop onClick={onClickHandle}>
      <Modal>{children}</Modal>
    </Backdrop>,
    modalRoot
  );
};


ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
};
