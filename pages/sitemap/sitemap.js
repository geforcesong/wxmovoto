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
    let data = { "conditions": { "isDistressed": 0, "isFixerUpper": 0, "hasPhoto": 1, "searchPropertyStatus": "INACTIVE", "pageIndex": 1, "isOpenHousesOnly": 0, "minPrice": 0, "minBed": 0, "searchType": "ZIPCODE", "sortColumn": "PRICE", "maxCountPerPage": 50, "hasPool": 0, "location": { "lat": 40.7464969, "lng": -74.0094471 }, "input": "10011 New York NY", "propertyTypes": ["SINGLE_FAMILY_HOUSE", "CONDO", "MULTI_FAMILY", "LAND", "MOBILE", "OTHER"], "minBath": 0, "sortOrder": "DESC" } }

    let url = "https://appapi.movoto.com/api/search";
    wx.request({
      url: url,
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
