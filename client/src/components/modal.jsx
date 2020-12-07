import React from 'react';
import { BiHeartCircle, BiCircle } from 'react-icons/bi';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: 0
    }
    this.changeCurrentFormat = this.changeCurrentFormat.bind(this);
  }

  changeCurrentFormat(index) {
    this.setState({
      currentFormat: parseInt(index)
    })
  }

  render() {
    return(
      <div className="modal">
        <div className="modal-main">
          <div className="modal-title-wrapper">
            <span className="modal-title"> All Formats & Editions </span>
            <span className="modal-button" onClick={this.props.handleAllInventoryClick}>x</span>
          </div>
          <div className="format-container">
            {
              this.props.inventory.map((item, index) => {
              return (<button name={index} className={`${this.state.currentFormat === index ? "modal-format-selected" : "modal-format"}`} onClick={(e ) => {this.changeCurrentFormat(e.target.name)}}>{item.name}</button>)
              })
            }
          </div>
          <div className="modal-information-wrapper">
            <img className="modal-information-children book-picture" src="https://picsum.photos/150/200" alt="book thumbnail here" width="150" height="200"/>
            <div className="modal-information-children">
              <div className="modal-book-title">{this.props.titleAndAuthor.title}</div>
              <div className="modal-book-publisher">Pub. Date: {this.props.titleAndAuthor.publicationDate}</div>
              <div className="modal-book-publisher">Publisher: {this.props.titleAndAuthor.publisher}</div>
              <div className="modal-product-details-link">Product Details > </div>
            </div>
            <div className="modal-information-children button-container-modal" >
              <div>
                <input type="submit" value="ADD TO CART" className="add-to-cart"/>
              </div>
              <div>
                <BiHeartCircle />
                <span className="add-to-wishlist">Add to Wishlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;