const cheerio = require('cheerio');
const axios = require("axios");
const express = require('express')

const app = express();

const port = 5000


const fox = []

axios.get('https://www.foxnews.com/')
.then(Response=>{
    const html = Response.data
    const $ = cheerio.load(html)
    
    $('.title',html).map(function(){
        const title =$(this).find('a').text();
        const url = $(this).find('a').attr('href');
        
        fox.push({title,url})
    })
    console.log(fox)
}).catch(err=>console.log(err))

app.get('/', (req, res) => {
    res.send(fox)
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })