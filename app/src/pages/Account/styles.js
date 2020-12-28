import styled from 'styled-components';

export const AccountContainer = styled.main`
  padding: 100px 10px 10px 10px;
  width: 100%;
  height: 100%;
  max-width: 400px;
  display: block;
  margin: auto;
  section{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a{
      padding: 10px 20px;
      border: 1px solid orangered;
      outline: none;
      border: 5px;
      color: #303030;
    }
    p{
      margin: 0 10px;
      font-size: 14px;
    }
    button{
      padding: 5px 10px;
      border: 0;
      background: White;
      margin: 20px;
      cursor: pointer;
      color: orangered;
      outline: none;
      border: 2px solid orangered;
      font-family: Nunito, sans-serif;
      font-size: 13px;
      border-radius: 5px;
      :focus{
        background: orangered;
        color: white;
      }
    }
  }
  header{
    width: 100%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    div{
      width: 100px;
      height: 100px;
      display: flex;
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