import React from "react";
import styled from "styled-components";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const MainVisual = () => {
  return (
    <>
      <Wrapper>
        <Logo></Logo>
        <Title>ColorCollection</Title>
        <Text>
          This site allows you to stock up on color schemes
          <br />
          from other websites that you like and share them with others.
        </Text>
        <Text>
          Now let's add our favorite color scheme
          <br />
          to this amazing service with a new one!
        </Text>
        <FacebookShareButton url={"#"}>
          <FacebookIcon size={24} />
        </FacebookShareButton>
        <TwitterShareButton url={"#"} title={"colorCollection"}>
          <TwitterIcon size={24} />
        </TwitterShareButton>
      </Wrapper>
    </>
  );
};

export default MainVisual;

const Wrapper = styled.div`
  padding: 114px 10px 64px;
  text-align: center;
  background: #fff;
`;
const Logo = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #5ee7df 0%,
    #a8edea 33%,
    #fed6e3 66%,
    #b490ca 100%
  );
  background-size: 300% 300%;
  animation: mvImg 5s ease infinite;

  @keyframes mvImg {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const Title = styled.h1`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 19px;
  font-weight: bold;
  color: #6a6969;
`;
const Text = styled.p`
  font-size: 13px;
  color: #6a6969;
`;
