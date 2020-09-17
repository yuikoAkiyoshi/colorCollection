import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from "react-router-dom"
import styled from "styled-components";

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

let Modal =<></>;
if(editFlag){
  Modal = (
    <EditModal>
      <EditModalItem>
        <span>main</span>
        <input type="color" defaultValue={mainColor} onChange={(e:any) => setMainColor(e.target.value)} />
      </EditModalItem>
      <EditModalItem>
        <span>sub</span>
        <input type="color" defaultValue={subColor} onChange={(e:any) => setSubColor(e.target.value)} />
      </EditModalItem>
      <EditModalItem>
        <span>accent</span>
        <input type="color" defaultValue={accentColor} onChange={(e:any) => setAccentColor(e.target.value)} />
      </EditModalItem>
      <EditModalItem>
        <span>text</span>
        <input type="color" defaultValue={textColor} onChange={(e:any) => setTextColor(e.target.value)} />
      </EditModalItem>
      <EditModalButton><button onClick={() => handleUpdateColor(id)}>submit</button></EditModalButton>
    </EditModal>
  )
}
return (
  <>
{Modal}
{props.colors.colorArray.map(color => <Card style={{ backgroundColor: color.mainColor }}>
      <SubColor style={{ backgroundColor: color.subColor }}>
        <AccentColor style={{ backgroundColor: color.accentColor }} />
        <Text style={{ color: color.textColor }}>Sample Text</Text>
      </SubColor>
      <ButtonWrapper>
        <Button style={{ color: color.textColor, backgroundColor: color.subColor }} onClick={() => handleEditFlag(color._id, color.mainColor, color.subColor, color.accentColor, color.textColor)}>edit</Button>
        <Link to={"/"}>
          <Button style={{ color: color.textColor, backgroundColor: color.subColor }}>back</Button>
        </Link>
        <Link to={"/"}>
          <Button style={{ color: color.textColor, backgroundColor: color.subColor }} onClick={() => handleDeleteColor(color._id)}>delete</Button>
        </Link>
      </ButtonWrapper>
    </Card>)
  }
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
  display: flex;
  justify-content: space-between;
  max-width: 420px;
  margin:32px auto 0;
  text-align: center;

  @media screen and (max-width: 414px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Button = styled.button`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: #fff;

  @media screen and (max-width: 414px) {
    width: 160px;
    height: 160px;
    margin-bottom: 20px;
  }
`;
const EditModal = styled.div`
  position: absolute;
  top: 50%;
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