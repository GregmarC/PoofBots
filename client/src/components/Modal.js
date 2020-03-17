import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js'
import {db} from '../firebase.js';
import '../App.css';

class Modal extends Component {

    constructor(props){
        super(props);
        this.state={
            username: "",
            email: "",
            password: ""
        }

    }

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
            const user = this.state.username;
            const email = this.state.email;
            const password = this.state.password;

            console.log(user);
            console.log(email);
            console.log(password);
            alert("Thank you " + user + ". You have successfully signed in.");
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


    isUserLoggedIn = () => {
        if(this.state.username === ""){
            return "Login";
        }
        else{
            return "Logout";
        }
    }
    
  render() {
    return (
      <>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          {this.isUserLoggedIn()}
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
                    <input placeholder="Please Input Username" id="username" type="text" className="validate" onChange={e => this.setState({username: e.currentTarget.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>email</i>
                    <input placeholder="Please Input Email" id="email" type="email" className="validate" onChange={e => this.setState({email: e.currentTarget.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>vpn_key</i>
                    <input placeholder="Please Input Password" id="password" type="password" className="validate" onChange={e => this.setState({password: e.currentTarget.value})}/>
                    </div>
                </div>
            </form>
        </div>
        </div>
        <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat red-text" >
            Close
            </a>
            <a className="modal-close waves-effect waves-green btn-flat red-text" >
            Submit
            </a>
        </div>
        </div>
      </>
    );
  }
}

export default Modal;