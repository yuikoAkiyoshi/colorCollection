import React, { useEffect }from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

type ColorListProps = {
  requestData: ()=>void;
  receiveDataSuccess: (arg0: any) => void;
  receiveDataFailed: () => void;
  colors: { 
    isFetching: boolean;
    colorArray: any[];
  };
}

const ColorList = (props: ColorListProps) =>{

  useEffect(() => {
  //read
  const fetchColor = () => {
    props.requestData()  // axios.get()を呼ぶ前にisFetchingをtrueにしておく
    axios.get('/api/colors')
    .then(response => {
      const _colorArray = response.data
      props.receiveDataSuccess(_colorArray)// データをstoreに保存するとともにisFetchingをfalseに
    })
    .catch(err => {
      console.error(new Error(err))
      props.receiveDataFailed()  // isFetchingをfalseに
    })
  }
  fetchColor();
}, []);

  return (
    <div>
      {
        props.colors.isFetching  // isFetchingの値で分岐
          ? <h2>Now Loading...</h2>  // データをFetch中ならばローディングアイコンを表示
          : <div>
              <ul>
                {props.colors.colorArray.map(color => (
                  <Link to={"/show/" + color._id} key={color._id}>
                    <li key={color._id}>  
                      {color.mainColor}
                      {color.subColor}
                      {color.accentColor}
                      {color.textColor}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
      }
    </div>
  )
}

const mapStateToProps = (state: { colors: any; }) => {
  return {
    colors: state.colors
  };
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; colorArray?: object; }) => any) => {
  return {
    requestData: () => dispatch(requestData()),
    receiveDataSuccess: (colorArray: object) => dispatch(receiveDataSuccess(colorArray)),
    receiveDataFailed: () => dispatch(receiveDataFailed())
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(ColorList)