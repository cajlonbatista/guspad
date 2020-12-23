import styled from 'styled-components';

export const AuthContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: bounce 0.8s linear;
  header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    img{
      width: 60px;
    }
    a{
      font-family: Poppins, sans-serif;
      color: #404040;
      font-size: 14px;
      text-decoration: none;
      :hover{
        text-decoration: underline;
      }
    }
  }
  form{
    width: 95%;
    max-width: 500px;
    margin: 10% auto;
    >div{
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      @media(max-width: 500px){
        margin-bottom: 10px;
      }
      label{
        font-family: Nunito, sans-serif;
        font-size: 14px;
        color: #404040;
      }
      input{
        font-family: Inter, sans-serif;
        padding: 7px 8px;
        border-radius: 5px;
        border: 2px solid transparent;
        margin: 4px 0px;
        background: #d6d7ff;
        outline: none;
        transition: all 0.4s;
        :focus{
          border: 2px solid #7e5dea;
          background: transparent;
        }
        :hover{
          opacity: 0.9;
        }
      }
    }
    button{
      display: block;
      width: 100%;
      max-width: 200px;
      margin: 10px auto;
      padding: 10px 15px;
      font-family: Poppins, sans-serif;
      font-size: 14px;
      background: white;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.4s;
      border: 2px solid #7d56ff;
      color: #7d56ff;
      outline: none;
    }
  }
`;