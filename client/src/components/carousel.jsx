import React from 'react';

var Carousel = (props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9781524763169" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9781524763169.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9781571311931" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9781571311931.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9780765326386" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9780765326386.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9780316187183" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9780316187183.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9780670020553" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9780670020553.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9780765386489" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9780765386489.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9781250088482" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9781250088482.jpg`} alt="book thumbnail here" width="100" />
      </div>

      <div className="pic-books" style={{marginLeft: '20px'}}>
        <img onClick={(id) => {props.onImageClick(id)}} id="9780062667632" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/9780062667632.jpg`} alt="book thumbnail here" width="100" />
      </div>

    </div>
  )
}

export default Carousel;