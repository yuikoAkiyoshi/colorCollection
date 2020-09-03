import React, { useEffect }from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

const ColorList = props =>{

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

const mapStateToProps = (state) => {
  return {
    colors: state.colors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestData: () => dispatch(requestData()),
    receiveDataSuccess: (colorArray) => dispatch(receiveDataSuccess(colorArray)),
    receiveDataFailed: () => dispatch(receiveDataFailed())
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(ColorList)
