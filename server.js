const axios = require('axios')
const parse = require('node-html-parser').parse
const nodemailer = require('nodemailer')

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
  subject: 'Sending Email using Node.js',
  text: 'That was easy?!',
}

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('***\n***\n***\nerror', error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})

// THIS GETS THE IMMO SCOUT RESULTS! - but now returns error...

// axios
//   .get(
//     'https://www.immobilienscout24.de/Suche/de/berlin/berlin/friedrichshain-kreuzberg/kreuzberg/wohnung-mieten?price=-800.0&pricetype=rentpermonth&enteredFrom=result_list'
//   )
//   .then((res) => {
//     const root = parse(res.data)
//     // console.log(res.data);
//     const logThis = root.querySelector('#resultListItems .result-list__listing')
//     // console.log(logThis);
//     console.log('--------------------------')
//     // console.log(Object.keys(logThis));
//     // console.log('--------------------------');
//     // console.log('\n');
//     // console.log(logThis.childNodes[0].childNodes.length);
//     // console.log(logThis.childNodes[0]);
//     // console.log(Object.keys(logThis.childNodes));

//     // logThis.childNodes.forEach(node=>{
//     //   console.log('\n-----woop----\n');
//     //   console.log(node);
//     // })
//   })
//   .catch((err) => console.log('\n***\n***\n***\nerr', err))

// setInterval(function(){ console.log("Hello") }, 5000);
