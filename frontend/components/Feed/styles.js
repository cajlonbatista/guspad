import styled from 'styled-components';

export const GridNotes = styled.section`
  padding-top: 80px!important;
  padding: 10px;
  height: 100vh;
  background: url(${require('../../assets/children.svg')});
  background-size: 50%;
  background-position: bottom right;
  background-repeat: no-repeat;
  @media(max-width: 600px){
    background: none;
  }
  article{
    width: 95%;
    max-width: 600px;
    padding: 10px 20px;
    background: #F4F4F4;
    border-radius: 5px;
    transition: all 0.4s;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    :hover{
      header{
        opacity: 1;
        border-top: 2px solid #7E5DEA;
      }
    }
    div:first-child{
      h1{
        font-family: Nunito, sans-serif;
        font-weight: 700;
        font-size: 18px;
        line-height: 40px;
      }
      p{
        font-family: Poppins, sans-serif;
        font-size: 14px;
        text-align: justify;
      }
      margin-bottom: 10px;
    }
    header{
      height: 40px;
      border-top: 2px solid transparent;
      transition: all 0.4s;
      opacity: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      button{
        margin: 0px 5px;
        svg{
          width: 25px;
        }
      }
    }
  }
`;