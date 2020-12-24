import React, { useEffect, useRef, useState } from 'react';

import { Drawer, IconButton, List, ListItem } from '@material-ui/core';
import { Menu, ChevronLeft } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Maker from '../Maker/Maker';

import { HeaderContainer, DrawerContent, SelectLink } from './styles';

import logo from '../../global/assets/post.svg';

const home = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>

);
const settings = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </g>
  </svg>
);
const account = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);
const about = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
  </svg>
);

const menu = [
  {
    path: '/',
    title: 'Notes',
    icon: home
  },
  {
    path: '/account',
    title: 'My Account',
    icon: account
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: settings
  },
  {
    path: '/about',
    title: 'About',
    icon: about
  }
]


const Header = props => {
  const { user } = props;
  const [hidden, setHidden] = useState(1);
  const [info, setInfo] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  const useOutsideAlerter = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          offDrawer();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    window.onscroll = () => handleScroll()
  }, []);

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 330) {
      setHidden(0);
    } else {
      setHidden(1)
    }
  }

  const onDrawer = e => {
    setInfo(true);
  }
  const offDrawer = e => {
    setInfo(false);
  }

  const drawer = (
    <Drawer anchor='left' variant='persistent' open={info} onClose={offDrawer}>
      <DrawerContent ref={wrapperRef} >
        <header>
          <Link to='/' onClick={offDrawer}>
            <img src={logo} alt='Guspad' />
          </Link>
          <IconButton onClick={offDrawer}>
            <ChevronLeft />
          </IconButton>
        </header>
        <section>
          <List>
            {
              menu.map(item => (
                (location.pathname == item.path)
                  ?
                  <SelectLink to={item.path} key={item.path}>
                    <ListItem button>
                      {
                        item.icon
                      }
                      {
                        item.title
                      }
                    </ListItem>
                  </SelectLink>
                  :
                  <Link to={item.path} key={item.path}>
                    <ListItem button>
                      {
                        item.icon
                      }
                      {
                        item.title
                      }
                    </ListItem>
                  </Link>
              ))
            }
          </List>
        </section>
        <footer>
          <span>&copy; Francisco Cajlon</span>
        </footer>
      </DrawerContent>
    </Drawer>
  );


  return (
    <HeaderContainer style={{ opacity: hidden }} >
      <Link to='/'>
        <IconButton onClick={onDrawer}>
          <Menu />
        </IconButton>
        <img src={logo} alt='Guspad' />
      </Link>
      {
        drawer
      }
      <div>
        <Maker user={user} />
        <img src={(user.avatar === undefined) ? 'https://c1.wallpaperflare.com/preview/811/367/789/technology-computer-creative-design.jpg' : user.avatar} alt={user.name} />
      </div>
    </HeaderContainer>
  );

};

export default Header;