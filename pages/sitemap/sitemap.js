var PropertyFactory = require('../../factories/propertyFactory.js');

Page({
  data: {
    userInput: '',
    pageIndex: 1,
    hasMoreListings: true,
    pageSize: 10,
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
  onReachBottom(e) {
    if (!this.data.hasMoreListings) {
      return;
    }
    var options = {};
    if (this.data.userInput) {
      options.input = this.data.userInput;
    }
    this.data.pageIndex++;
    options.pageIndex = this.data.pageIndex;
    options.mode = 'ADD';
    this.doRealSearch(options);
  },
  doRealSearch(options) {
    let propertyFactory = new PropertyFactory();
    var self = this;
    this.setData({ hiddenLoading: false });
    options.pageSize = this.data.pageSize;
    propertyFactory.search(options).then((ret) => {
      if (ret && ret.status && ret.status.code === 0) {
        let result = ret.data.listings;
        if (options.mode === 'ADD') {
          self.data.listings = self.data.listings.concat(result);
          self.setData({ listings: self.data.listings })
        } else {
          self.setData({ listings: result })
        }
        if (ret.data.totalCount > (this.data.pageSize * this.data.pageIndex)) {
          this.data.hasMoreListings = true;
        } else {
          this.data.hasMoreListings = false;
        }
      }
      this.setData({ hiddenLoading: true })
    }).catch((e) => {
      this.setData({ hiddenLoading: true })
    });
  },
  onCardTap(e) {
    if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: `../dpp/dpp?url=${e.currentTarget.dataset.url}`
      })
    }
  }
})
