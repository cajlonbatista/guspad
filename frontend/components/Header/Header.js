import React, { useEffect, useState } from 'react';
import Maker from '../Maker/Maker';

import { HeaderContainer, HeaderContainerFaded } from './styles';

const Header = (props) => {
  const { user, url } = props;
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
        <img src={require('../../assets/post.svg')} />
        <Maker user={user} api={url} />
      </HeaderContainer>
    );
  } else {
    return (
      <HeaderContainer style={{ opacity: 0 }}>
        <img src={require('../../assets/post.svg')} />
        <Maker user={user} api={url} />
      </HeaderContainer>
    );
  }
  
};

export default Header;