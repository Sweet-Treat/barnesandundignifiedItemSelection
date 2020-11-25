import React from 'react';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: 0
    }
    this.changeCurrentFormat = this.changeCurrentFormat.bind(this);
  }

  changeCurrentFormat(index) {
    console.log('somene clicked on ', index);
  }

  render() {
    return(
      <div className="modal">
        <div className="modal-main">
          <div className="modal-title-wrapper">
            <span className="modal-title"> All Formats & Editions </span>
            <button className="modal-button" onClick={this.props.handleAllInventoryClick}>x</button>
          </div>
          <div>
            {
              this.props.inventory.map((item, index) => {
              return (<span className={`${this.state.currentFormat === index ? "modal-format-selected" : "modal-format"}`} onClick={this.changeCurrentFormat}>{item.name}</span>)
              })
            }
          </div>
          <div className="modal-information-wrapper">
            <img className="modal-information-children" src="book_thumbnail.jpg" alt="book thumbnail here" width="150"/>
            <div className="modal-information-children">
              <div className="modal-book-title">{this.props.titleAndAuthor.title}</div>
              <div className="modal-book-publisher">Pub. Date: {this.props.titleAndAuthor.publicationDate}</div>
              <div className="modal-book-publisher">Publisher: {this.props.titleAndAuthor.publisher}</div>
              <div>Product Details > </div>
            </div>
            <div className="modal-information-children">
              <div className="button-container">
                <input type="submit" value="ADD TO CART" className="add-to-cart"/>
              </div>
              <div>Add to Wishlist</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;