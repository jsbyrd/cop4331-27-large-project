import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './SideBarModal.css';

Modal.setAppElement('#root');

const SideBarModal = (props) => {

    const navigate = useNavigate();
    const { isSideBarOpen, setIsSideBarOpen } = props;
    const [sidebarStyle, setSideBarStyle] = useState({
        content: {
            border: '1px solid #ccc',
            backgroundColor: 'white',
            position: 'fixed',
            top: '0',
            left: '-200px',
            right: 'auto',
            bottom: 'auto',
            height: '100vh',
            width: '200px',
            zIndex: '1',
            padding: '20px',
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
                left: '-200px',
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
        if (type == 2)
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
                    <h2></h2>
                    <button id='x-btn' onClick={closeSideBar}>X</button>
                </div>
                <div className='sidebar-buttons flex-grow-1'>
                    <div className='other-btn'>
                        <button className="btn btn-primary mb-3" onClick={event => window.location.href = '/createquiz'}> Create Quiz</button>
                        <button type="button" className="btn btn-primary mb-3" id='default-header-login-btn' onClick={event => {goToSearch(2); closeSideBar(event)}}>
                            Saved Quizzes
                        </button>
                        <button type="button" className="btn btn-primary mb-3" id='default-header-register-btn' onClick={event => {goToSearch(3); closeSideBar(event)}}>
                            My Quizzes
                        </button>
                    </div>
                    <button className="btn btn-primary" id="logout-btn" onClick={event => window.location.href = '/'}> Logout </button>
                </div>
            </div>
        </Modal>
    );
}

export default SideBarModal;
