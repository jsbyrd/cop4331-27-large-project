import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import wizard_pfp from './images/wizard-pfp.png';
import './SideBarModal.css';

Modal.setAppElement('#root');

const SideBarModal = (props) => {

    const navigate = useNavigate();
    const { isSideBarOpen, setIsSideBarOpen } = props;
    const [sidebarStyle, setSideBarStyle] = useState({
        content: {
            border: 'none',
            backgroundColor: 'white',
            position: 'fixed',
            top: '0',
            left: '-200px',
            right: 'auto',
            bottom: 'auto',
            height: '100vh',
            width: '250px',
            zIndex: '1',
            padding: '0px',
            transition: 'left 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
        },
        overlay: {
            backgroundColor: 'transparent',
            zIndex: '1',
        },
    });

    useEffect(() => {
        // Animate sidebar sliding on screen
        if (isSideBarOpen) {
            setSideBarStyle((prevStyles) => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    left: '0',
                },
            }));
        }
    }, [isSideBarOpen]);

    function closeSideBar(e) {
        e.preventDefault();
        // Animate sidebar sliding off screen
        setSideBarStyle((prevStyles) => ({
            ...prevStyles,
            content: {
                ...prevStyles.content,
                left: '-250px',
            },
        }));
        // Set isSideBarOpen to false after animation completes
        setTimeout(() => {
            setIsSideBarOpen(false);
        }, 300);
    }

    // Complete the search
    const goToSearch = async (type) => {
        //setIsSideBarOpen(false);
        if (type === 2)
            navigate('/search/savedQuizzes', { state: 2 });
        else
            navigate('/search/myQuizzes', { state: 3 })
    }

    return (
        <Modal
            isOpen={isSideBarOpen}
            onRequestClose={closeSideBar}
            style={sidebarStyle}
            contentLabel="Example Modal"
        >
            <div id='sidebar-container'>
                <div className='sidebar-header'>
                    <button id='x-btn' onClick={closeSideBar}>X</button>
                    <img id='wizard-pfp-img' src={wizard_pfp} alt='An owl wearing a wizard hat' />
                </div>
                <div className='sidebar-btn-container'>
                    <button className="sidebar-btn" onClick={() => window.location.href = '/menu'}>Main Menu</button>
                    <button className="sidebar-btn" onClick={() => window.location.href = '/createquiz'}>Create Quiz</button>
                    <button type="button" className="sidebar-btn" onClick={event => {goToSearch(2); closeSideBar(event)}}>
                        Saved Quizzes
                    </button>
                    <button type="button" className="sidebar-btn" onClick={event => {goToSearch(3); closeSideBar(event)}}>
                        My Quizzes
                    </button>
                </div>
                <div className='logout-btn-container'>
                    <button className="sidebar-btn" id="logout-btn" onClick={() => window.location.href = '/'}>Logout</button>
                </div>
            </div>
        </Modal>
    );
}

export default SideBarModal;
