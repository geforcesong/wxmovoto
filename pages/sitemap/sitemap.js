var PropertyFactory = require('../../factories/propertyFactory.js');

Page({
  data: {
    userInput: '',
    listings: [],
    hiddenLoading: true
  },
  updateInputText: function (e) {
    this.data.userInput = e.detail.value;
  },
  onLoad: function (e) {
    this.performSearch();
  },
  performSearch: function (e) {
    let propertyFactory = new PropertyFactory();
    var self = this;
    var options = {};
    if (this.data.userInput) {
      options.input = this.data.userInput;
    }
    this.setData({
      hiddenLoading: false
    })
    propertyFactory.search(options).then((ret) => {
      if (ret && ret.status && ret.status.code === 0) {
        let listings = ret.data.listings;
        self.setData({
          listings: listings
        })
      }
      this.setData({
        hiddenLoading: true
      })
    });
  }
})
