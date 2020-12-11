import React from 'react';

import { HeaderContainer } from './styles';

const Header = (props) => {
  const { user } = props;
  const { username } = user;
  return (
    <HeaderContainer>
      <img src={require('../../assets/post.svg')} />
      <span>{username}</span>
    </HeaderContainer>
  );
};

export default Header;