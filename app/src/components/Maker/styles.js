import styled from 'styled-components';



export const MakerContainer = styled.section`
  position: relative;
  button{
    display: block;
    margin: auto;
  }
`;

export const MakerForm = styled.form`
  width: 500px;
  height: 460px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  @media(max-width: 1279px){
    width: 100%;
    height: 100%;
  }
  >header{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;  
    padding: 5px 25px;
    span{
      font-family: Poppins, sans-serif;
      color: #7E5DEA;
      font-size: 18px;
      font-weight: 500;
    }
  }
  >section{
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
      input, textarea{
        font-family: Inter, sans-serif;
        padding: 7px 8px;
        border-radius: 2px;
        border: 2px solid #d6d7ff;
        margin: 4px 0px;
        outline: none;
        border-radius: 5px;
        transition: all 0.2s;
        :focus{
          border: 2px solid #7e5dea;
          background: transparent;
        }
        :hover{
          opacity: 0.9;
        }
      }
      textarea{
        height: 200px;
        resize: none;
      }
    }
    >button:last-child{
      display: block;
      width: 50%;
      max-width: 200px;
      margin: 10px auto;
      padding: 10px 15px;
      font-family: Poppins, sans-serif;
      font-size: 14px;
      background: #7d56ff;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      color: white;
      outline: none;
    }
  }
`;