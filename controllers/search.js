const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();


exports.getIndex = (req, res, next) => {
  res.render('index');
};

exports.getBooks = (req, res, next) => {
  let uid = req.query.userId;
  axios({
    method: "GET",
    url: " https://www.goodreads.com/review/list?v=2",
    params: {
      v: process.env.VERSION,
      id: uid,
      shelf: process.env.SHELF,
      key: process.env.KEY,
      sort: 'date_read',
      order: 'd'
    }
  }).then((response) => {
    let r = xml2js.parseStringPromise(response.data).then(function (result) {

      return result;
    }).catch(err => console.error(err));
    return r;
  }).then((jsonData) => {
    let bd = JSON.stringify(jsonData, null, 2);
    console.log(bd);
    res.render('index', { title: req.query.userId, bookData: bd});
  }).catch(err => console.error(err));

 
};