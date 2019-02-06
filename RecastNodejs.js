//creating C4C ,Retrieving Ticket status,Creating Product in Hana DB using Nodejs code via Recast
const express = require('express')
const bodyParser = require('body-parser')
var request = require("request")

const app = express()
const port = process.env.port || process.env.PORT || 3000
app.use(bodyParser.json())
//while calling webhook with the name /nuskin/overrideadr the below function will trigger
//The below function is used to create a prodect in Hana DB 
app.post('/nuskin/overrideadr', (req, res) => {
 // console.log(req.body)

  var quantity = req.body.conversation.memory.number;
  var creditcard = req.body.conversation.memory.creditcard;
  var shipadd = req.body.conversation.memory.shipaddress;
  console.log(`${quantity.scalar} ${creditcard.raw} ${shipadd.raw}`)

  var payload = {
    "PRODUCTID": "10005590",
    "PRODUCTNAME":"AGELOC DERMATIC EFFECTS",
    "PRODUCTDESCRIPTION": "Scientifically formulated to bring ageLOC anti-aging benefits to the body every day, ageLOC Dermatic Effects helps smooth the appearance of skin and improve the appearance of skin firmness. This daily contouring moisturizer helps promote cell turnover, returning skin to its natural radiance.",
    "UNITPRICE":"$55.00",
    "POINTVALUE": "September",
    "TOTAL":"$55.00",
    "SHIPPINGADDRESS":shipadd.raw,
    "PHONE":"949-701-6242",
    "QUANTITY": (quantity.scalar).toString(),
    "CARDNUMBER": creditcard.raw,
    "CARDTYPE":"Credit Card",
    "CARDHOLDERNAME": "Linda Manuzon"
    }

  console.log(payload)
  var url = "https://xs01sdctechmo.hana.ondemand.com/DBR-71165/products.xsodata/PRODUCTS"

          overrideadr(url, '', payload)
            .then((body) => {
              res.send({
                replies: [{
                  type: 'text',
                  content: 'Your order has been placed. The order id is #338982\nWe will process your ADR ASAP ahead of your usual ADR process date.\nIs there anything else I can help you with on this ADR?'
                }]
              })
            })
});

app.post('/nuskin/createticket', (req, res) => {

  var ticketdescription = req.body.conversation.memory.ticketdescription;
  var priority = req.body.conversation.memory.ticketpriority;

  console.log(`desc: ${ticketdescription}, priority:${priority.raw}`);

  var priorityCode = "";
  switch (priority.raw.toLowerCase()) {
    case 'low':priorityCode = "7"; break;
    case 'normal':priorityCode = "3"; break;
    case 'immediate':priorityCode = "1"; break;
    case 'urgent':priorityCode = "2"; break;
    default: priorityCode = "3";

  }

  var url = "https://my341337.crm.ondemand.com/sap/c4c/odata/v1/c4codata";
  var payload = {

    "ProcessingTypeCode": "SRRQ",
    "Name": {
      "languageCode": "EN",
      "content": ticketdescription
    },
    "CustomerID": "1010254",
    "DataOriginTypeCode": "1",
    "ProductID": "10005590",
    "ServicePriorityCode": ""+priorityCode,
    "ServiceRequestLifeCycleStatusCode": "1",
    "RoleCode": "8"


  };
  var auth = "Basic " + new Buffer('Serviceagent01' + ":" + 'Welcome1').toString("base64");

  getCSRFTokenResponseHeader(url, auth)
  .then((headers) => {
    createTicket(url, auth, headers, payload)
      .then((body) => {
        //console.log(body);
        body = JSON.parse(body)
        res.send({
          replies: [
            { type: 'text', content: `Ticket created with the following ID:${body.d.results.ID}` },
          ]
        })
      })
  })
  .catch((err) => console.error(err));

});

app.post('/nuskin/ticketstatus', (req, res) => {
  const ticketno = req.body.conversation.memory.ticketno;
  var url = "https://my341337.crm.ondemand.com/sap/c4c/odata/v1/c4codata/ServiceRequestCollection?$filter=ID eq '"+ticketno+"'&$format=json";
  var auth = "Basic " + new Buffer('Serviceagent01' + ":" + 'Welcome1').toString("base64");
  getTicketStatus(url, auth)
  .then((body) => {
    body = JSON.parse(body);
    res.json({
      replies: [
        { type: 'text', content: `Sure, here are the details,\nCustomer: ${body.d.results[0].Customer},\nProduct: ageLOC Dermatic Effects,\nStatus: ${body.d.results[0].ServiceRequestLifeCycleStatusCodeText}\nDescription: ${body.d.results[0].Name.content}` },
      ],
    });
  })
  .catch((err) => console.error(err));

});
const getTicketStatus = function (url, auth) {
  return new Promise((resolve, reject) => {

    var options = {
      method: 'GET',
      url: url,
      headers:{
        'Authorization':auth
      }
    };

    request(options, function (error, response, body) {
      if (error) throw reject(err)
      resolve(response.body);
    });
  })
};
const overrideadr = function (url, auth, payload) {
  return new Promise((resolve, reject) => {

    var options = {
      method: 'POST',
      url: url,
      auth: auth,
      headers:
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    request(options, function (error, response, body) {
      if (error) throw reject(err)
      resolve(response.body);
    });
  })
};

const getCSRFTokenResponseHeader = function (url, auth) {
  return new Promise((resolve, reject) => {
      console.log(auth);
    var options_csrf = {
      method: 'GET',
      url: url,
    //  auth: auth,
      headers:
      {
        'Authorization':auth,
        'x-csrf-token': 'fetch',
        'content-type': 'application/json',
      }
    };
    request(options_csrf, function (error, response, body) {
      if (error) throw reject(error);
      resolve(response.headers);
    });
  })
};

const createTicket = function (url, auth, csrfResponseHeader, payload) {
  return new Promise((resolve, reject) => {

    var options = {
      method: 'POST',
      timeout: 7000,
      url: url+'/ServiceRequestCollection',
      //auth: auth,
      headers:
      {
        'Authorization':auth,
        'x-csrf-token': csrfResponseHeader['x-csrf-token'],
        'cookie': csrfResponseHeader['set-cookie'].join(';'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    request(options, function (error, response, body) {
      if (error) throw reject(error)
      resolve(response.body);
    });
  })
};

app.post('/errors', (req, res) => {
  console.log(req.body)
  res.send()
})

app.listen(port, () => {
  console.log('Server is running on port 3000')
})
