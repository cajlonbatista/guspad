import styled from 'styled-components';

export const AccountContainer = styled.main`
  padding: 100px 10px 10px 10px;
  header{
    width: 100%;
    max-width: 400px;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div{
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      transition: all 0.4s;
      overflow: hidden;
      position: relative;
      svg{
        opacity: 0;
        transition: all 0.4s;
        position: absolute;
        top: center;
        right: center;
      }
      input{
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      :hover{
        opacity: 0.8;
        svg{
          opacity: 1;
        }
      }
    }
    h1{
      font-family: Poppins, sans-serif;
      font-size: 19px;
    }
  }
`;