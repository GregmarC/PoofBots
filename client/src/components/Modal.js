import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js';
import firebase from 'firebase';
import '../App.css';

class Modal extends Component {

    constructor(props){
        super(props);
        this.state={
            username: "",
            email: "",
            password: "",
            firebaseUserEmail: ""
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


    setCurrentUser = () => {
        const user = auth.currentUser;
        console.log(user);
        this.setState({firebaseUserEmail: user.email})
    }


    handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log("User successfully signed in!: ", cred.user.email);
            this.setState({email: cred.user.email});

            const userUid = auth.currentUser.uid;
            console.log("This is the user's uid: ", userUid);
            alert("Thank you! You have successfully logged in as: " + email);
            this.setCurrentUser();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });
      }

    userLogout = (event) => {
        auth.signOut()
        .then(() => {
            this.setState({firebaseUserEmail: ""});
            alert("You have successfully signed out.");
        });

        
    }

    
  render() {

    if (this.state.firebaseUserEmail === "") {
        return (
            <>
              <a
                className="waves-effect waves-light btn modal-trigger"
                data-target="modal1"
              >
                Login
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
                  <form onSubmit={this.handleLogin} className="col s12">
                      <div class="row">
                          <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                          <i className="material-icons prefix" style={{color: "#E31C13"}}>account_circle</i>
                          <input placeholder="Please Input Your Username" id="username" type="text" className="validate" onChange={e => this.setState({username: e.currentTarget.value})}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                          <i className="material-icons prefix" style={{color: "#E31C13"}}>email</i>
                          <input placeholder="Please Input Your Email" id="email" type="email" className="validate" onChange={e => this.setState({email: e.currentTarget.value})}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12" style={{borderBottom: "1px solid", boxShadow: "0 5px 0 0"}}>
                          <i className="material-icons prefix" style={{color: "#E31C13"}}>vpn_key</i>
                          <input placeholder="Please Input Your Password" id="password" type="password" className="validate" onChange={e => this.setState({password: e.currentTarget.value})}/>
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
    else {
        return (
            <>
              <a
                className="waves-effect waves-light btn modal-trigger"
                data-target="modal1"
              >
                Logout
              </a>
      
              <div
                ref={Modal => {
                  this.Modal = Modal;
                }}
                id="modal1"
                className="modal"
              >
              <div className="modal-content">
                <div className="container-fluid" style={{display: "flex", justifyContent: "center"}}>
                    <div className="row">
                        <div className="col s12 black-text" style={{paddingLeft: "10px"}}>
                            Are you sure you wish to log out?
                        </div>
                        <div style={{paddingLeft: "50px"}}>
                            <button className="modal-close waves-effect waves-red btn white-text" >
                                No
                            </button>
                            <button style={{marginLeft: "30px"}} className="modal-close waves-effect waves-green btn white-text" name="action" onClick={this.userLogout}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              </div>
            </>
          );
    }
    
  }
}

export default Modal;