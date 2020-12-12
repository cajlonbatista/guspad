import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100vw;
  padding: 15px 20px;
  background: #EAEBFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  top: 0;
  img{
    width: 40px;
  }
`;