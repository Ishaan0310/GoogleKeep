import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './sidemenu.css';

export default function SideMenu({ open, setOpen, darkTheme }) {
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const darkStyles = darkTheme ? {
        backgroundColor: "#121212",
        color: "#ffffff"
    } : {};

    return (
        <Drawer
            className="sideMenuDrawer"
            variant="persistent"
            anchor="left"
            open={open}
            PaperProps={{ style: darkStyles }} // Set the styles for the paper here
        >
            <div className="sideMenuCloseButtonContainer">
                <IconButton onClick={handleDrawerClose} style={darkStyles}>
                    <CloseIcon />
                </IconButton>
            </div>
            <List>
                {[ 'Trash'].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        style={darkStyles}
                    >
                        <ListItemButton style={darkStyles}>
                        <ListItemIcon style={{ color: darkTheme ? 'white' : 'inherit' }}>
    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
</ListItemIcon>

                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}




