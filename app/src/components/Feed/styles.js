import styled from 'styled-components';

export const GridFeed = styled.main`
  padding: 100px 10px 10px 10px;
  animation: bounce 0.5s linear ; 
  ::selection{
    background: transparent;
  }
  >header{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    input{
      width: 90%;
      max-width: 200px;
      margin: 10px 0px;
      padding: 5px 10px;
      border: 2px solid #d6d7ff;
      color: #828482;
      border-radius: 5px;
      outline: none;
      transition: all 0.3s;
      font-family: Inter, sans-serif;
      font-size: 14px; 
      :hover{
        border-color: #7e5dea;
      }
    }
  }
`;