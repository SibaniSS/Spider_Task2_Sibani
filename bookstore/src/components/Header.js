import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Avatar, Box, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <AppBar sx={{ backgroundColor: '#232F3D' }} position="sticky">
      <Toolbar>
        <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <Typography>
            <LibraryBooksOutlinedIcon />
          </Typography>
        </NavLink>
        <Tabs
          sx={{ ml: 'auto' }}
          textColor="inherit"
          indicatorColor="secondary"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          <Tab LinkComponent={NavLink} to="/about" label="Home" />
          <Tab LinkComponent={NavLink} to="/books" label="Books" />
          <Tab LinkComponent={NavLink} to="/add" label="Add Book" />
          <Tab LinkComponent={NavLink} to="/favorites" label="Favorites" />
          <Tab LinkComponent={NavLink} to="/purchases" label="Purchase" />
        </Tabs>
        {auth.isLoggedIn ? (
          <Box display="flex" alignItems="center" ml={2}>
            <Typography variant="h6" color="inherit">
              {auth.userName}
            </Typography>
            <Avatar src={auth.userProfilePic} alt={auth.userName} sx={{ ml: 2 }} />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            color="inherit"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
