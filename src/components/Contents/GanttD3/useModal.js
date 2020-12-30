import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState({
    isShowing: false,
    contextId: null
  });

  function toggleModal(contextId = null) {
    setModal({
      isShowing: !modal.isShowing,
      contextId: contextId
    });
  }

  return {
    modal,
    toggleModal,
  }
};

export default useModal;