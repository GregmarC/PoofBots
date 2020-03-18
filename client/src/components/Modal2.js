import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js'
import {db} from '../firebase.js';
import '../App.css';

class Modal2 extends Component {
    constructor(props){
        super(props);
        this.state={
            username2: "",
            email2: "",
            password2: "",
            firebaseUserEmail2: ""
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

  handleRegistration = (event) => {
    event.preventDefault();
    const email = event.target.email2.value;
    const password = event.target.password2.value;
    event.target.reset();
    auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                const userId = this.state.username2;
                console.log(cred);
                const user = cred.user.email;
                alert("Thank you! You have successfully created a PoofBot account!");
                this.setState({firebaseUserEmail2: user});
                return db.collection('users').doc(cred.user.uid).set({
                    email : cred.user.email,
                    username : userId
                });
            }).catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
              } else {
                console.log(error);
              }
              // [END_EXCLUDE]
            });
  }

  render() {
    return (
      <>

        <a className="waves-effect waves-light btn modal-trigger" data-target="modal2">
          Register
        </a>
        

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal2"
          className="modal"
        >
        <div className="modal-content">
        <div className="row">
            <form onSubmit={this.handleRegistration} className="col s12">
                <div class="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>account_circle</i>
                    <input placeholder="Please Create A Username" id="username2" type="text" className="validate" onChange={e => this.setState({username2: e.currentTarget.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>email</i>
                    <input placeholder="Please Input Email" id="email2" type="email" className="validate" onChange={e => this.setState({email2: e.currentTarget.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                    <i className="material-icons prefix" style={{color: "#E31C13"}}>vpn_key</i>
                    <input placeholder="Please Create A Password" id="password2" type="password" className="validate" onChange={e => this.setState({password2: e.currentTarget.value})}/>
                    </div>
                </div>
                <div className="modal-footer">
                  <button className="modal-close waves-effect waves-red btn white-text" >
                  Close
                  </button>
                  <button style={{marginLeft: "30px"}} className="modal-close waves-effect waves-green btn white-text" type="submit" name="action" >
                  Submit
                  </button>
              </div>
            </form>
        </div>
        </div>
        </div>
      </>
    );
  }
}

export default Modal2;