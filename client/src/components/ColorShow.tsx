import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from "react-router-dom"
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

type ColorShowProps = {
  requestData: () => void;
  receiveDataSuccess: (arg0: any) => void;
  receiveDataFailed: () => void;
  id: any;
  colors: { 
    colorArray: { 
      map: (arg0: (color: any) => JSX.Element) => JSX.Element ;
    }
  }
}

const ColorShow = (props: ColorShowProps) => {
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
    const targetColor = _colorArray.filter((color: { _id: any })=>color._id===props.id)
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
  const handleUpdateColor = (id: undefined) => {
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
      const targetColor = _colorArray.filter((color: { _id: any })=>color._id===props.id)
      props.receiveDataSuccess(targetColor)// データをstoreに保存するとともにisFetchingをfalseに
      setEditFlag(false)
    })
    .catch(err => {
      console.error(new Error(err))
      props.receiveDataFailed()
    })
  }


//delete
const handleDeleteColor = (id: any) => {
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

const handleEditFlag =(id: React.SetStateAction<undefined>,mainColor: React.SetStateAction<undefined>,subColor: React.SetStateAction<undefined>,accentColor: React.SetStateAction<undefined>,textColor: React.SetStateAction<undefined>)=>{
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
              <input defaultValue={mainColor} onChange={(e:any) => setMainColor(e.target.value)} />
            </label>
            <label>
              サブカラー:
              <input defaultValue={subColor} onChange={(e:any) => setSubColor(e.target.value)} />
            </label>
            <label>
              アクセントカラー:
              <input defaultValue={accentColor} onChange={(e:any) => setAccentColor(e.target.value)} />
            </label>
            <label>
              テキストカラー:
              <input defaultValue={textColor} onChange={(e:any) => setTextColor(e.target.value)} />
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

const mapStateToProps = (state: { colors: any }, ownProps: { match: { params: { id: any } } }) => {
    const id = ownProps.match.params.id;
  return {
    id: id,
    colors: state.colors
  };
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; colorArray?: object }) => any) => {
  return {
    requestData: () => dispatch(requestData()),
    receiveDataSuccess: (colorArray: object) => dispatch(receiveDataSuccess(colorArray)),
    receiveDataFailed: () => dispatch(receiveDataFailed())
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(ColorShow)