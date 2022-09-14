import React, { Component } from 'react';
import './Notecard.css';

class Notecard extends Component {
  render() {
    return (
      <div className="notecard">         
        <div className="notecard-left">
          <div className="notecard-main-content">
            <img className="notecard-thumbnail" src={this.props.imageURL}/>
            <div className="notecard-text">
              <div className="note-title-container">
                <div className="note-title">
                  {this.props.noteTitle}
                </div>
              </div>
              <div className="note-body">
                {this.props.noteBody}
              </div>
            </div>
          </div>
          <div className="notecard-footer">
            {this.props.noteFooter}
          </div>
        </div>
        <div className="notecard-right">
          <div className="icon icon-expand material-symbols-outlined">
            expand_more
          </div>
          <div className="icon icon-collapse material-symbols-outlined">
            expand_less
          </div>
          <div className="toolbar">
            <div className="material-symbols-outlined icon icon-edit">
              edit
            </div>
            <div className="material-symbols-outlined icon icon-delete">
              delete
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default Notecard