import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  initializeForm,
  requestData,
  receiveDataSuccess,
  receiveDataFailed,
} from "../actions";

type ColorNewProps = {
  requestData: () => void;
  receiveDataSuccess: (arg0: any) => void;
  initializeForm: () => void;
  receiveDataFailed: () => void;
};

const ColorNew = (props: ColorNewProps) => {
  const [mainColor, setMainColor] = useState("");
  const [subColor, setSubColor] = useState("#cccccc");
  const [accentColor, setAccentColor] = useState("");
  const [textColor, setTextColor] = useState("");

  const handleSubmit = () => {
    props.requestData();
    axios
      .post("/api/colors", {
        mainColor,
        subColor,
        accentColor,
        textColor,
      }) // オブジェクトをサーバーにPOST
      .then((response) => {
        const colorArray = response.data;
        props.receiveDataSuccess(colorArray);
        props.initializeForm(); // submit後はフォームを初期化
      })
      .catch((err) => {
        console.error(new Error(err));
        props.receiveDataFailed();
      });
  };

  return (
    <div>
      <EditModal>
        <EditModalItem>
          <span>main</span>
          <input
            type="color"
            defaultValue={mainColor}
            onChange={(e: any) => setMainColor(e.target.value)}
          />
        </EditModalItem>
        <EditModalItem>
          <span>sub</span>
          <input
            type="color"
            defaultValue={subColor}
            onChange={(e: any) => setSubColor(e.target.value)}
          />
        </EditModalItem>
        <EditModalItem>
          <span>accent</span>
          <input
            type="color"
            defaultValue={accentColor}
            onChange={(e: any) => setAccentColor(e.target.value)}
          />
        </EditModalItem>
        <EditModalItem>
          <span>text</span>
          <input
            type="color"
            defaultValue={textColor}
            onChange={(e: any) => setTextColor(e.target.value)}
          />
        </EditModalItem>
        <EditModalButton>
          <Link to={"/"}>
            <button onClick={() => handleSubmit()}>submit</button>
          </Link>
        </EditModalButton>
      </EditModal>
      <Card style={{ backgroundColor: mainColor }}>
        <SubColor style={{ backgroundColor: subColor }}>
          <AccentColor style={{ backgroundColor: accentColor }} />
          <Text style={{ color: textColor }}>Sample Text</Text>
        </SubColor>
        <ButtonWrapper>
          <Link to={"/"}>
            <Button style={{ color: textColor, backgroundColor: subColor }}>
              back
            </Button>
          </Link>
        </ButtonWrapper>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: { colors: any }) => {
  return {
    colors: state.colors,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; colorArray?: object }) => any
) => {
  return {
    requestData: () => dispatch(requestData()),
    receiveDataSuccess: (colorArray: object) =>
      dispatch(receiveDataSuccess(colorArray)),
    initializeForm: () => dispatch(initializeForm()),
    receiveDataFailed: () => dispatch(receiveDataFailed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorNew);

const Card = styled.div`
  position: relative;
  min-height: 100vh;
  padding-top: 152px;
  background-color: #fff;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
`;
const SubColor = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;
  height: 210px;
  margin: auto;
  border-radius: 16px;
  text-align: center;
`;
const Text = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;
const AccentColor = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  display: inline-block;
  width: 100px;
  height: 24px;
  border-radius: 24px;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  max-width: 420px;
  margin: auto;
  padding: 0 10px;
  text-align: center;
`;
const Button = styled.button`
  border-radius: 48px;
  width: 100%;
  height: 68px;
  background: #fff;
`;
const EditModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 70vw;
  margin: auto;
  padding: 24px 36px;
  z-index: 9;
  height: 200px;
  opacity: 0.9;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.1);
`;
const EditModalItem = styled.label`
  display: flex;
  justify-content: space-between;

  > input {
    width: 60px;
    height: 30px;
  }
`;
const EditModalButton = styled.div`
  text-align: center;
  margin-top: 16px;

  > button {
    width: fit-content;
    padding: 0 12px;
    text-align: center;
    border-bottom: solid 1px #000;
  }
`;
