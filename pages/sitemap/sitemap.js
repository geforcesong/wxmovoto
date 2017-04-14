var PropertyFactory = require('../../factories/propertyFactory.js');

Page({
  data: {
    userInput: '',
    pageIndex: 1,
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
    var self = this;
    var options = {};
    if (this.data.userInput) {
      options.input = this.data.userInput;
    }
    self.data.pageIndex = 1;
    self.doRealSearch(options);
  },
  loadBottom: function (e) {
    console.log("fired")
    var self =this;
    var options = {};
    if (this.data.userInput) {
      options.input = this.data.userInput;
    }
    self.data.pageIndex++;
    options.pageIndex = self.data.pageIndex;
    options.mode = 'ADD';
    self.doRealSearch(options);
  },
  onReachBottom(e){
    console.log('sdfsd')
    console.log(e);
  },
  doRealSearch(options) {
    let propertyFactory = new PropertyFactory();
    var self = this;
    this.setData({
      hiddenLoading: false
    })
    propertyFactory.search(options).then((ret) => {
      if (ret && ret.status && ret.status.code === 0) {
        let result = ret.data.listings;
        if (options.mode === 'ADD') {
          self.data.listings.concat(result);
          self.setData({
            listings: self.data.listings
          })
        } else {
          self.setData({
            listings: result
          })
        }
      }
      this.setData({
        hiddenLoading: true
      })
    });
  }
})
