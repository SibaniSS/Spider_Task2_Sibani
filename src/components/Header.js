import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

const Header = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar sx={{ backgroundColor: '#232F3D' }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: 'white' }}>
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
            <Tab LinkComponent={NavLink} to="/about" label="About Us" />
            
            <Tab LinkComponent={NavLink} to="/books" label="Books" />
            <Tab LinkComponent={NavLink} to="/add" label="Add product" />
            <Tab LinkComponent={NavLink} to="/favorites" label="Favorites" /> {/* Add the Favorites tab */}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
