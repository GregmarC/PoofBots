import React, { Component } from "react";
import M from "materialize-css";

import '../App.css';

class Modal2 extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
      <>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          Register
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
        <div className="modal-content">
        <div className="row">
            <form className="col s12">
                <div class="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>account_circle</i>
                    <input placeholder="Please Input Username" id="username" type="text" className="validate" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>email</i>
                    <input placeholder="Please Input Email" id="email" type="email" className="validate" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>vpn_key</i>
                    <input placeholder="Please Input Password" id="password" type="password" className="validate" />
                    </div>
                </div>
            </form>
        </div>
        </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat red-text">
              Close
            </a>
            <a className="modal-close waves-effect waves-green btn-flat red-text">
              Submit
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Modal2;