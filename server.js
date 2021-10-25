const axios = require('axios')
const parse = require('node-html-parser').parse
const nodemailer = require('nodemailer')
let cron = require('node-cron')
let moment = require('moment')

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
// https://www.npmjs.com/package/node-cron

const text = 'Running a task every 5 minutes...'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: require('./secrets.json').user,
    pass: require('./secrets.json').pass,
  },
})

var mailOptions = {
  from: 'myfakeonere@gmail.com',
  to: 'patrinoua@gmail.com',
  subject: 'Scheduled email :-)',
  // text: 'That was easy?!',
  text: `${text}${moment().format('MMM Do YYYY, HH:mm')}`,
}

// SCHEDULE EMAILS TO BE SENT EVERY 5 MINUTES!
// cron.schedule('*/5 * * * *', () => {
//   console.log(text, moment().format('MMM Do YYYY, HH:mm'))
//   // Send e-mail
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log('***\n***\n***\nerror', error)
//     } else {
//       console.log('Email sent: ' + info.response)
//     }
//   })
// })

// SCHEDULE EMAILS TO BE SENT EVERY MINUTE!
// cron.schedule('*/ * * * *', () => {
//   console.log(text, moment().format('MMM Do YYYY, HH:mm'))
// })

// THIS GETS THE IMMO SCOUT RESULTS! - but now returns error...
const ebayURL = `https://www.ebay-kleinanzeigen.de/s-wohnung-mieten/kreuzberg/wohnung/k0c203l3375+wohnung_mieten.etage_i:3,+wohnung_mieten.qm_d:49,+wohnung_mieten.zimmer_d:2,`
const immonetURL = `https://www.immonet.de/immobiliensuche/sel.do?pageoffset=1&listsize=26&objecttype=1&locationname=Kreuzberg%2C+Berlin&acid=&actype=&district=7876&ajaxIsRadiusActive=true&sortby=16&suchart=2&radius=5&pcatmtypes=1_2&pCatMTypeStoragefield=1_2&parentcat=1&marketingtype=2&fromprice=&toprice=900&fromarea=49&toarea=&fromplotarea=&toplotarea=&fromrooms=&torooms=&objectcat=-1&wbs=-1&fromyear=&toyear=&fulltext=&absenden=Ergebnisse+anzeigen`
//this returns an error! Request failed with status code 405
// const immobilienScoutURL = `https://www.immobilienscout24.de/Suche/radius/wohnung-mieten?centerofsearchaddress=Berlin%3B%3B%3B1100000002%3B%3BFriedrichshain-Kreuzberg&numberofrooms=1.5-&price=-900.0&livingspace=49.0-&pricetype=rentpermonth&floor=3-&geocoordinates=52.50381%3B13.42824%3B4.0`

axios
  .get(immonetURL)
  .then((res) => {
    const root = parse(res.data)
    // console.log(res.data)
    const logThis = root.querySelector(
      '#result-list-stage .place-over-understitial'
    )
    console.log(logThis)

    console.log('--------------------------')
    // console.log(Object.keys(logThis));
    // console.log('--------------------------');
    // console.log('\n');
    // console.log(logThis.childNodes[0].childNodes.length);
    // console.log(logThis.childNodes[0]);
    // console.log(Object.keys(logThis.childNodes));

    // logThis.childNodes.forEach(node=>{
    //   console.log('\n-----woop----\n');
    //   console.log(node);
    // })
  })
  .catch((err) => console.log('\n***\n***\n***\nerr', err))
