import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";


const Header = () =>{

  return (
    <>
    <Wrapper>
        <Inner>
        <Link to="/">
            <Logo>ColorCollection</Logo>
        </Link>
        <Link to="/new">
            <Item>New</Item>
        </Link>
        </Inner>
    </Wrapper>
    </>
  )
}

export default Header

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 88px;
  background: rgba(255,255,255,.9);
  z-index: 10;
`;
const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 790px;
  margin: auto;
  padding: 0 12px;
  line-height: 88px
`;
const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;

  ::before {
    content:'';
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    transform: rotate(45deg);
    border-radius: 3px;
  }

  @media screen and (max-width: 414px) {
    font-size: 12px;
  }
`;
const Item = styled.div`
  width: 130px;
  font-size: 10px;
  font-weight: bold;
  color: #333;
  line-height: 42px;
  border-radius: 42px;
  border: 2px solid #3583fb;
  text-align: center;

  @media screen and (max-width: 414px) {
    width: 88px;
    line-height: 24px;
  }
`;