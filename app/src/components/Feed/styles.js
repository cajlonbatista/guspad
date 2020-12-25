import styled from 'styled-components';

export const GridFeed = styled.main`
  animation: bounce 0.5s linear ; 
  width: 100%;
  height: 100%;
  padding: 10px;
  ::selection{
    background: transparent;
  }
`;

export const Searching = styled.form`
  padding: 100px 10px 10px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media(max-width: 500px){
    padding: 100px 5px 5px 23px;
    justify-content: center;
    h1{
      display: none;
    }
    input{
      width: 90%;
      max-width: 300px;
    }
  }
  div{
    position: relative;
  }
  h1{
    font-family: Poppins, sans-serif;
    font-size: 17px;
    font-weight: 500;
    margin: 0;
  }
  input{
    width: 90%;
    max-width: 200px;
    margin: 5px 0px;
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
  svg{
    position: absolute;
    top: 27%;
    right: 25px;
    width: 20px;
    :hover, :focus{
      fill: #7e5dea;
    }
  }
`;

export const NotFoundSearch = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    width: 80%;
    max-width: 200px;
    margin: auto;
  }
`;

export const Bounce = styled.div`
  animation: bounce 0.5s linear ; 
`;