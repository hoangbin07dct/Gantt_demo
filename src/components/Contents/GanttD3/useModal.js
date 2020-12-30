import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState({
    type: null,
    isShowing: false,
    contextId: null,
  });

  function toggleModal(e, modalType = null, contextId = null) {
    if (!!e && e.target.alt !== 'expController') {
      setModal({
        type: modalType,
        isShowing: !modal.isShowing,
        contextId: contextId,
      });
    }
  }

  return {
    modal,
    toggleModal,
  };
};

export default useModal;
