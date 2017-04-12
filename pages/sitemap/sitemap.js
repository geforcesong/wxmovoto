var PropertyFactory = require('../../factories/propertyFactory.js');

Page({
  data: {
    title: 'hello, world',
    userInput: '',
    listings: [
      { "name": "George", "Age": 20 },
      { "name": "Hust", "Age": 30 }
    ]
  },
  updateInputText: function (e) {
    this.data.userInput = e.detail.value;
    this.data.listings.push({ "name": "Hust1", "Age": 40 });
    this.setData({
      listings:this.data.listings
    })
    this.setData({
      title:'hello earth'
    })
  },
  performSearch: function (e) {
    let propertyFactory = new PropertyFactory();
    propertyFactory.search().then((d)=>{
      console.log(d);
    });
  }
})
