'use strict'
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('structjson');
const mongoose = require('mongoose');

const googleAuth = require('google-oauth-jwt');

//Code from original version on Udemy, obsolete: 
//const sessionClient = new dialogflow.SessionsClient();   - variable defined below
//const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
 
const projectId = config.googleProjectID;       
const sessionId = config.dialogFlowSessionID;
 
//Code from original version on Udemy, obsolete: 
//const languageCode = config.dialogFlowSessionLanguageCode;
 
const credentials = {
    client_email: config.googleClientEmail,
    private_key:
        config.googlePrivateKey,
};


const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const Registration = mongoose.model('registration');

//Function from Poof API backend to retrieve search products
async function getProducts(keywords){
    console.log("Now fetching items.........")
  
    try{
      let response = await axios({
        method: 'post',
        url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
        headers: {
          "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
          "Accept" : "application/json",
          "Content-Type" : "application/json",
        },
        data: {"keywords" : keywords},
      })
    
      let items = await response.data;
      console.table(items.items, ["title"]);
      return items;
  
    }
  
    catch(err){
      console.log("An error occurred in the getProducts function!!!!!: ", err);
    }
  }

function firstFive(items){
    let arr = [];
    let counter = 5;
    
    for(let item of items){

        if(item.title && counter > 0){
            arr.push(item.title)
        }

        counter--;

        if(counter <= 0){
            break
        }
    }

    return arr;
}

module.exports = {

    getToken: async function(){
        return new Promise((resolve) => {
            googleAuth.authenticate({
                email: config.googleClientEmail,
                key: config.googlePrivateKey,
                scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            },
            (err, token) => {
                resolve(token);
            },
            );
        });
    },



    textQuery: async function(text, userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        console.log("Backend port 5000: textQuery ", responses);
        responses = await self.handleAction(responses)
        return responses;
    },

    eventQuery: async function(event, userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
        let self = module.exports;

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            }
        };
        let responses = await sessionClient.detectIntent(request);
        console.log("Backend port 5000: eventQuery ", responses);
        responses = await self.handleAction(responses)
        return responses;
    },

    handleAction: async function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);
                }

                break;
        }

        if(queryResult.allRequiredParamsPresent && queryResult.intent.displayName == "Products"){
            console.log("test backend chatbot");

            let item = queryResult.parameters.product;

            try{
                let items = await getProducts(item);
                return items;
            }

            catch(error){
                console.log(error);
            }
        }

        return responses;
    },

    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        }
        catch (err){
            console.log(err);
        }
    }
}