import React, {Component} from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import Card2 from './Card2';
import QuickReplies from './QuickReplies';
import QuickReply from './QuickReply';
import { withRouter } from 'react-router-dom';
import '../../App.css'; 
import robot from '../../../src/images/robot.png'

const cookies = new Cookies();

class Chatbot extends Component {

    messagesEnd;
    talkInput;
    constructor(props){
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

        this.state = {
            messages: [],
            shopWelcomeSent: false,
            clientToken: false,
            regenerateToken: 0
        };

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        
        console.log(cookies.get('userID'));
    }

    async df_text_query(text){
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };

        this.setState({messages: [...this.state.messages, says]});

        const request = {
            queryInput: {
                text: {
                    text: text,
                    languageCode: 'en-US',
                },
            }
        };
        await this.df_client_call(request);
    };
    

    
    async df_event_query(event) {
        const request = {
            queryInput: {
                event: {
                    name: event,
                    languageCode: 'en-US',
                },
            }
        };

        await this.df_client_call(request);

    };

    async df_client_call(request) {

        try {
            if (this.state.clientToken === false) {
                const res = await axios.get('/api/get_client_token');
                this.setState({clientToken: res.data.token});
            }

            var config = {
                headers: {
                    'Authorization': "Bearer " + this.state.clientToken,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            const res = await axios.post(
                'https://dialogflow.googleapis.com/v2/projects/' + 'reactpageagent-eydmdv' +
                '/agent/sessions/' + 'react-bot-session' + cookies.get('userID') + ':detectIntent',
                request,
                config
            );

            let  says = {};


            if (res.data.queryResult.fulfillmentMessages ) {
                for (let msg of res.data.queryResult.fulfillmentMessages) {
                    says = {
                        speaks: 'bot',
                        msg: msg
                    }
                    this.setState({ messages: [...this.state.messages, says]});
                }
            }
        } catch (e) {
            if (e.response.status === 401 && this.state.regenerateToken < 1) {
                this.setState({ clientToken: false, regenerateToken: 1 });
                this.df_client_call(request);
            }
            else {
                let says = {
                    speaks: 'bot',
                    msg: {
                        text : {
                            text: "I'm having troubles. I need to terminate. will be back later"}
                    }
                }
                this.setState({ messages: [...this.state.messages, says]});
                let that = this;
            }
        }
    }



    resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x * 1000);
        });
    }

    async componentDidMount() {
        this.df_event_query('Welcome');

        if (window.location.pathname === '/shop' && !this.state.shopWelcomeSent) {
            await this.resolveAfterXSeconds(1);
            this.df_event_query('WELCOME_SHOP');
            this.setState({shopWelcomeSent: true});
        }

        this.props.history.listen(() => {
            console.log('listening');
            if (this.props.history.location.pathname === '/shop' && !this.state.shopWelcomeSent) {
                this.df_event_query('WELCOME_SHOP');
                this.setState({shopWelcomeSent: true});
            }
        });
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView( {behaviour: "smooth"} );
        if ( this.talkInput ) {
            this.talkInput.focus();
        }

        console.log(this.state.messages);
    }

    _handleQuickReplyPayload(event, payload, text){
        event.preventDefault();
        event.stopPropagation();

        switch (payload) {
            case 'recommended_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            case 'training_masterclass':
                this.df_event_query('MASTERCLASS');
                break;
            default:
                this.df_text_query(text);
                break;
        }
    }

    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card}/>);
    }

    renderOneMessage(message, i) {
        console.log(message);
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        }
        else if (message.msg && message.msg.card){
            return <Card2 key={i} payload={message.msg.card}/>
        }
        else if (message.msg
            && message.msg.payload
            && message.msg.payload.cards) {

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div style={{overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.cards.length * 270}}>
                                {this.renderCards(message.msg.payload.cards)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }    
        else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.quick_replies
        ) {
            return (
                <QuickReplies
                    text={message.msg.payload.text ? message.msg.payload.text : null}
                    key={i}
                    replyClick={this._handleQuickReplyPayload}
                    speaks={message.speaks}
                    payload={message.msg.payload.quick_replies} />
            )
        }           
    }

    renderMessages(stateMessages){
        if (stateMessages){
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i)              
            });
        }
        else{
            return null;
        }
    }


    _handleInputKeyPress(e){
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    
    render() {
        
            return (
                
                <div style={{display:"flex", justifyContent:"center"}} className="container">
                    <div className="container" style={{ height: "10%", width: "100%", border: '1px solid lightgrey', backgroundColor: "white", display: "block", marginTop: "20px" }}>
                        <nav >
                            <div className="row">
                                                                  
                                <div className="nav-wrapper red darken-3 z-depth-3">
                                    <div className="col s12 l1" style={{paddingTop: "10px"}}>
                                        <img src={robot} alt="bot" className="circle responsive-img robotPic"/>
                                    </div>  
                                    <div style={{fontSize: "300%", textAlign: "center", paddingRight: "60px", fontFamily: "Roboto"}}>PoofBot</div>
                                </div>
                            </div>                               
                        </nav>
        
                        <div id="chatbot" style={{ height: 388, width: '100%', overflow: 'auto'}}>
                            {this.renderMessages(this.state.messages)}
                            <div ref={(el) => { this.messagesEnd = el; }}                   
                                style={{ float: 'left', clear: "both"}}>
                            </div>
                        </div>
                        <div className="col s12">
                            <input id="messageBox" style={{margin: 0, paddingRight: '1%', width: '98%'}} placeholder="type a message" type="text" ref={(input) => {this.talkInput = input; }} onKeyPress={this._handleInputKeyPress}/>
                        </div>
                    </div>
                </div>
            
            
        )
        
        
    }
} 

export default withRouter(Chatbot);