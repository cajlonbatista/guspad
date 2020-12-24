import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100vw;
  padding: 15px 20px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  animation: bounce 0.5s linear ; 
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  top: 0;
  img{
    width: 40px;
    margin-left: 20px;
  }
  a{
    display: flex;
    align-items: center;
  }
  >div:last-child{
    display: flex;
    align-items: center;
  }
  >div:last-child  >img:last-child{
      width: 35px;
      height: 35px;
      border-radius: 100%;
  }
`;

export const DrawerContent = styled.main`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  height: 100%;
  header{
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E0E0E0;
    img{
      width: 55px;
    }
  }
  section{
    width: 100%;
    >ul{
      width: 100%;
      >a{
        width: 100%;
        color: #202020;
        :hover{
          color: #202020;
        }
        div{
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      svg{
        width: 30px;
        margin-right: 20px;
      }
    }
    font-family: Poppins, sans-serif;
    font-size: 14px;
  }
  footer{
    padding: 5px;
  }
`;

export const SelectLink = styled(Link)`
  svg{
    fill: #7e5dea!important;
  }
  color: #7e5dea!important;
`;  