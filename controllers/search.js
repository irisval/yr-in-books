const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();


exports.getIndex = (req, res, next) => {
  res.render('index');
};


const filterJson = (data) => {
  const books = data.GoodreadsResponse.reviews[0].review;
  const filteredBooks = books.filter((bookData) => {
    let readYear =  new Date(Date.parse(bookData.date_updated[0]));
    let currYear = new Date();
    return readYear.getFullYear() === currYear.getFullYear();
  }).map((bookData) => {
    let book = bookData.book[0];

    let bd = {
      "isbn": book.isbn[0],
      "isbn13": book.isbn13[0],
      "title": book.title[0],
      "title_without_series": book.title_without_series[0],
      "image_url": book.image_url[0],
      "gr_link": book.link[0],
      "num_pages": book.num_pages[0],
      "pub_year": book.publication_year[0],
      "avg_rating": book.average_rating[0],
      "description": book.description[0],
      "authors": book.authors,
    };

    bd.rating = bookData.rating[0],
    bd.read_count = bookData.read_count[0],
    bd.shelves = bookData.shelves[0],
    bd.finished_at = bookData.date_updated[0]
    return bd;
  })
  return JSON.stringify(filteredBooks, null, 2);
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
      pages: 1-10,
      per_page: 200,
      order: 'd'
    }
  }).then((response) => {
    let r = xml2js.parseStringPromise(response.data).then(function (result) {

      return result;
    }).catch(err => console.error(err));
    return r;
  }).then((jsonData) => {
    let bd = filterJson(jsonData);
    console.log(bd);
    res.render('index', { title: req.query.userId, bookData: bd});
  }).catch(err => console.error(err));
};