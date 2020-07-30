const {WebhookClient, Card} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Coupon = mongoose.model('coupon');
const Registration = mongoose.model('registration');

const axios = require('axios');


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

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function snoopy(agent) {
            agent.add(`Welcome to my Snoopy fulfillment!`);
        }

        async function products(agent) {
            
            let item = agent.parameters.product;

            // agent.add("Here are the items I was able to find: fullfillmentRoute");
            function formatCardItem(title,image,text,buttonText,buttonUrl){
                let item = {
                  title : title,
                  imageUrl : image,
                  text : text,
                  buttonText : buttonText,
                  buttonUrl : buttonUrl
                }
                return item
              }
              
            function AddCard(item, agent){
                agent.add(new Card(item));
            }
            
            try{

                let searchItems = await getProducts(item);
                agent.add(`Here are the items I was able to find: `);


                // let titles = firstFive(searchItems.items);
                // searchItems.items.map(item => {
                //     agent.add(`${item.title}`)
                // })

                // titles.map(title => {
                //     agent.add(`${title}`)
                // });

                let items = searchItems.items;

                console.log(items);

                let cards = items.map(item => formatCardItem(item.title, item.image));

                cards.map(card => AddCard(card, agent));

            } 
            catch(error){
                console.log('An error occurred: ', error);
            }

        }

        async function registration(agent) {

            const registration = new Registration({
                name: agent.parameters.name,
                address: agent.parameters.address,
                phone: agent.parameters.phone,
                email: agent.parameters.email,
                dateSent: Date.now()
            });
            try{
                let reg = await registration.save();
                console.log(reg);
            } catch (err){
                console.log(err);
            }
        }

        async function learn(agent){
            Demand.findOne({'course': agent.parameters.courses}, function(err, course) {
                if (course !== null) {
                    course.counter++;
                    course.save();
                }
                else{
                    const demand = new Demand({course:agent.parameters.courses});
                    demand.save();
                }
            });
            let responseText = `You want to learn about ${agent.parameters.courses}, 
                Here is a link to all of my courses: https://www.udemy.com/user/jana-bergant`;
            
            let coupon = await Coupon.findOne({'course': agent.parameters.courses});
            if(coupon !== null){
                responseText = `You want to learn about ${agent.parameters.courses}, 
                Here is a link to the course: ${coupon.link}`;
            }

            agent.add(responseText);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('snoopy', snoopy);
        intentMap.set('learn courses', learn);
        intentMap.set('recommend courses - yes', registration);
        intentMap.set('Default Fallback Intent', fallback);
        intentMap.set('Products', products);
        

        agent.handleRequest(intentMap);
    });

} 
