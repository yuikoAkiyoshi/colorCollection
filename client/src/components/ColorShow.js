import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from "react-router-dom"
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

const ColorShow = (props) => {
const [id, setId] = useState()
const [mainColor, setMainColor] = useState()
const [subColor, setSubColor] = useState()
const [accentColor, setAccentColor] = useState()
const [textColor, setTextColor] = useState()
const [editFlag, setEditFlag] = useState(false)

useEffect(() => {
//read
const fetchColor = () => {
  props.requestData()  // axios.get()を呼ぶ前にisFetchingをtrueにしておく
  axios.get('/api/colors/')
  .then(response => {
    const _colorArray = response.data
    const targetColor = _colorArray.filter((color)=>color._id===props.id)
    props.receiveDataSuccess(targetColor)// データをstoreに保存するとともにisFetchingをfalseに
  })
  .catch(err => {
    console.error(new Error(err))
    props.receiveDataFailed()  // isFetchingをfalseに
  })
}
fetchColor();
}, []);

  //update
  const handleUpdateColor = id => {
    props.requestData()
    axios.put('/api/colors', {
      id,
      mainColor,
      subColor,
      accentColor,
      textColor,
    })
    .then(response => {
      const _colorArray = response.data
      const targetColor = _colorArray.filter((color)=>color._id===props.id)
      props.receiveDataSuccess(targetColor)// データをstoreに保存するとともにisFetchingをfalseに
      setEditFlag(false)
    })
    .catch(err => {
      console.error(new Error(err))
      props.receiveDataFailed()
    })
  }


//delete
const handleDeleteColor = id => {
  props.requestData()
  axios({
    method: 'delete',
    url: '/api/colors',
    data: {
      id,
    }
  })
  .then(response => {
    const _colorArray = response.data
    props.receiveDataSuccess(_colorArray)
  })
  .catch(err => {
    console.error(new Error(err))
    props.receiveDataFailed()
  })
}

const handleEditFlag =(id,mainColor,subColor,accentColor,textColor)=>{
  setId(id)
  setMainColor(mainColor)
  setSubColor(subColor)
  setAccentColor(accentColor)
  setTextColor(textColor)
  setEditFlag(true)
}

let DOM =<></>;
if(editFlag){
  DOM = (
    <div>
            <label>
              メインカラー:
              <input defaultValue={mainColor} onChange={e => setMainColor(e.target.value)} />
            </label>
            <label>
              サブカラー:
              <input defaultValue={subColor} onChange={e => setSubColor(e.target.value)} />
            </label>
            <label>
              アクセントカラー:
              <input defaultValue={accentColor} onChange={e => setAccentColor(e.target.value)} />
            </label>
            <label>
              テキストカラー:
              <input defaultValue={textColor} onChange={e => setTextColor(e.target.value)} />
            </label>
            <button onClick={() => handleUpdateColor(id)}>submit</button>
          </div>
  )
  }else{
  DOM = (
    props.colors.colorArray.map(color => (
    <li key={color._id}>
        {color.mainColor}
        {color.subColor}
        {color.accentColor}
        {color.textColor}
        <button onClick={()=>handleEditFlag(color._id,color.mainColor,color.subColor,color.accentColor,color.textColor)}>編集する</button>
        <Link to={"/"}>
        <button onClick={() => handleDeleteColor(color._id)}>delete</button>
        </Link>
      </li>
  ))
  )
}
return (
  <>
{DOM}
  </>
  )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
  return {
    id: id,
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




export default connect(mapStateToProps, mapDispatchToProps)(ColorShow)
