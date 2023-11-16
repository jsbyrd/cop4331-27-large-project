import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: 'auto',
    bottom: 'auto',
    height: '100vh', 
    width: '200px',
    zIndex: '1',
    padding: '20px'
  },
  overlay:  {
    backgroundColor: 'transparent',
    zIndex: '1',
    },
};

Modal.setAppElement('#root');

const SideBarModal = (props) => {
    const {isSideBarOpen, setIsSideBarOpen} = props;
  
    function closeSideBar(e) {
      e.preventDefault();
      setIsSideBarOpen(false);
    }

    return(
        <Modal
            isOpen={isSideBarOpen}
            onRequestClose={closeSideBar}
            style={customStyles}
            contentLabel="Example Modal"
      >
        <div id='sidebar-container'>
          <div className='sidebar-header'>
            <h2>SideBar</h2>
            <button onClick={closeSideBar}>X</button>
          </div>
        </div>
      </Modal>
    );
}

export default SideBarModal;
