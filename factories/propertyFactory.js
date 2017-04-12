class PropertyFactory {
    constructor() {

    }

    search(options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            let postData = { "conditions": { "isDistressed": 0, "isFixerUpper": 0, "hasPhoto": 1, "searchPropertyStatus": "INACTIVE", "pageIndex": 1, "isOpenHousesOnly": 0, "minPrice": 0, "minBed": 0, "searchType": "ZIPCODE", "sortColumn": "PRICE", "maxCountPerPage": 50, "hasPool": 0, "location": { "lat": 40.7464969, "lng": -74.0094471 }, "input": "10011 New York NY", "propertyTypes": ["SINGLE_FAMILY_HOUSE", "CONDO", "MULTI_FAMILY", "LAND", "MOBILE", "OTHER"], "minBath": 0, "sortOrder": "DESC" } }
            if (options.input) {
                postData.conditions.input = options.input;
            }
            let url = "https://appapi.movoto.com/api/search";
            wx.request({
                url: url,
                method: "POST",
                data: postData,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    let responseData = null;
                    if (res) {
                        responseData = res.data;
                    }
                    return resolve(responseData);
                },
                fail: function () {
                    return resolve(null);
                }
            })
        });
    }
}

module.exports = PropertyFactory;