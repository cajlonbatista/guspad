import styled from 'styled-components';

export const NoteContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  border-radius: 5px;
  margin: 10px;

  input{
    font-family: Poppins, sans-serif;
    font-size: 16px;
    color: #000000;
    font-weight: 600;
  }
  div{
    font-family: Nunito, sans-serif;
    font-size: 14px;
  }
  input, >div{
    border: 1.3px solid transparent;
    padding: 5px;
    outline: none;
    background: transparent;
    resize: none;
  }
  span{
    font-size: 11px;
    font-family: Nunito, sans-serif;
    position: absolute;
    transform: rotate(90deg);
    bottom: 30px;
    right: -20px;
  }
  svg{
    position: absolute;
    top: 0;
    right: 0;
    width: 23px;
    @media(max-width: 500px){
      width: 30px;
    }
    cursor: pointer;
    :hover{
      fill: transparent;
      stroke: #404040;
    }
  }
`;

export const Color = styled.div`
  display: block;
  margin: auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #404040;
`;

export const DialogColor = styled.main`
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: auto;
`;