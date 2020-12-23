import React, { useEffect, useState } from 'react';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Maker from '../Maker/Maker';

import { HeaderContainer } from './styles';

import logo from '../../global/assets/post.svg';

const Header = (props) => {
  const { user } = props;
  const [hidden, setHidden] = useState(false);

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 330) {
      setHidden(true);
    } else {
      setHidden(false)
    }
  }

  useEffect(() => {
    window.onscroll = () => handleScroll()
  }, []);

  if (hidden === false) {
    return (
      <HeaderContainer >
        <Link to='/'>
          <IconButton>
            <Menu/>
            </IconButton>
          <img src={logo} alt='Guspad' />
        </Link>
        <div>
          <Maker user={user} />
          <img src={(user.avatar === undefined) ? 'https://c1.wallpaperflare.com/preview/811/367/789/technology-computer-creative-design.jpg' : user.avatar} alt={user.name} />
        </div>
      </HeaderContainer>
    );
  } else {
    return (
      <HeaderContainer style={{ opacity: 0 }}>
        <img src={logo} alt='Guspad' />
        <Maker user={user} />
      </HeaderContainer>
    );
  }

};

export default Header;
