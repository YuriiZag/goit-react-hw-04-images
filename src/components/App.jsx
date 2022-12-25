import { SearchBar } from './search-bar/search-bar';
import { ImageGallery } from './gallery/image-gallery';
import { ModalWindow } from './modal/modal';
import { useState } from 'react';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [showModalState, setShowModalState] = useState(false);
  const [modalPicture, setModalPicture] = useState({});

  const onFormSubmit = data => {
    
    setSearchRequest(data);
  
  };

  const toggleModal = () => {
    
    setShowModalState(!showModalState);
  
  };

  const onPictureClick = data => {
      
    toggleModal();
    setModalPicture(data)
      
  }

  return (
    <>
      <SearchBar onSubmitHandler={onFormSubmit}></SearchBar>
      <ImageGallery
        request={searchRequest}
        openModal={onPictureClick}
      ></ImageGallery>
      {showModalState && (
        <ModalWindow onClose={toggleModal}>
          <img
            src={modalPicture.fullSize}
            alt={modalPicture.tags}
          />
        </ModalWindow>
      )}
    </>
  );
};
