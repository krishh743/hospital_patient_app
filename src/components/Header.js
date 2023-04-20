import {Button, Stack} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/patients');
    };

    return (
        <div>
            <header className="header">
                <div className="brand-box">
                    <span className="brand">Shree Krishna Hospital</span>
                </div>

                <div className="text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary-main">All Entries and List of Patient</span>
                    </h1>
                    <div className="text-box1" >
                    <Button
                        variant="outlined"
                        // onClick={handleClick}
                    >
                        Admin Login
                    </Button>
                    <Button
                      
                        variant="outlined"
                        onClick={handleClick}
                    >
                        See Patients List
                    </Button>
</div>
                </div>
            </header>
        </div>
    );
}

export default Header;
