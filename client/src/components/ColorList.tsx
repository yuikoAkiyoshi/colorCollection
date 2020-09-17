import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { requestData, receiveDataSuccess, receiveDataFailed } from "../actions";

import MainVisual from "./MainVisual";

import "../css/colorList.scss";

type ColorListProps = {
  requestData: () => void;
  receiveDataSuccess: (arg0: any) => void;
  receiveDataFailed: () => void;
  colors: {
    isFetching: boolean;
    colorArray: any[];
  };
};

const ColorList = (props: ColorListProps) => {
  useEffect(() => {
    //read
    const fetchColor = () => {
      props.requestData(); // axios.get()を呼ぶ前にisFetchingをtrueにしておく
      axios
        .get("/api/colors")
        .then((response) => {
          const _colorArray = response.data;
          props.receiveDataSuccess(_colorArray); // データをstoreに保存するとともにisFetchingをfalseに
        })
        .catch((err) => {
          console.error(new Error(err));
          props.receiveDataFailed(); // isFetchingをfalseに
        });
    };
    fetchColor();
  }, []);

  return (
    <div>
      <MainVisual />
      {props.colors.isFetching ? ( // isFetchingの値で分岐
        <h2>Now Loading...</h2> // データをFetch中ならばローディングアイコンを表示
      ) : (
        <div className="container">
          <section className="colorList">
            <Cards>
              {props.colors.colorArray.map((color) => {
                return (
                  <Link to={"/show/" + color._id} key={color._id}>
                    <Card style={{ backgroundColor: color.mainColor }}>
                      <SubColor style={{ backgroundColor: color.subColor }}>
                        <AccentColor
                          style={{ backgroundColor: color.accentColor }}
                        />
                        <Text style={{ color: color.textColor }}>
                          Sample Text
                        </Text>
                      </SubColor>
                    </Card>
                  </Link>
                );
              })}
            </Cards>
          </section>
        </div>
      )}
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
    receiveDataFailed: () => dispatch(receiveDataFailed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorList);

const Cards = styled.div`
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: (1fr) [3];
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 2rem;
      -webkit-column-gap: 2rem;
      -moz-column-gap: 2rem;
      column-gap: 2rem;
      grid-row-gap: 3rem;
      row-gap: 3rem;
      margin-top: 32px;

      @media screen and (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (max-width: 414px) {
      grid-template-columns: repeat(1, 1fr);
      }
  }
}
`;
const Card = styled.div`
  display: flex;
  algin-item: center;
  position: relative;
  height: 280px;
  background-color: #fff;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.2);
  border-radius: 16px;
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
