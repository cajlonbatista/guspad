import styled from 'styled-components';



export const MakerContainer = styled.section`
  padding: 10px;
  width: 100%;
  max-width: 100px;
  margin: auto;
  border: 10px solid #FFFEDE;
  background-color: #FFFEDE;
  border-top: 0px!important;
  border-radius: 0px 0px 50% 50%;
  button{
    display: block;
    margin: auto;
  }
`;

export const MakerForm = styled.form`
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px!important;
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
      border-radius: 5px;
      border: 2px solid transparent;
      margin: 4px 0px;
      background: #d6d7ff;
      outline: none;
      transition: all 0.4s;
      :focus{
        border: 2px solid #7e5dea;
        box-shadow: 0px 0px 11px -3px rgba(126,93,234,0.75);
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
`;