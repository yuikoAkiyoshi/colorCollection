import React, { useState } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from "react-router-dom";
import { initializeForm, requestData, receiveDataSuccess, receiveDataFailed } from '../actions'


const ColorNew = (props) => {
  const [mainColor, setMainColor] = useState("");
  const [subColor, setSubColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [textColor, setTextColor] = useState("");

    const handleSubmit = () => {
        props.requestData()
        axios.post('/api/colors', {
            mainColor,
            subColor,
            accentColor,
            textColor,
        })  // オブジェクトをサーバーにPOST
        .then(response => {
            const colorArray = response.data
            props.receiveDataSuccess(colorArray)
            props.initializeForm()  // submit後はフォームを初期化
        })
        .catch(err => {
            console.error(new Error(err))
            props.receiveDataFailed()
        })
    }

  return (
    <div>
        <label>
          メインカラー:
          <input onChange={e => setMainColor(e.target.value)} />
        </label>
        <label>
          サブカラー:
          <input onChange={e => setSubColor(e.target.value)} />
        </label>
        <label>
          アクセントカラー:
          <input onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label>
          テキストカラー:
          <input onChange={e => setTextColor(e.target.value)} />
        </label>
        <Link to={"/"}>
        <button onClick={() => handleSubmit()}>submit</button>
        </Link>
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
    initializeForm: () => dispatch(initializeForm()),
    receiveDataFailed: () => dispatch(receiveDataFailed())
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(ColorNew)
