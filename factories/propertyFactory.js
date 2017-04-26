class PropertyFactory {
    constructor() {

    }

    search(options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            let postData = { "conditions": { "isDistressed": 0, "isFixerUpper": 0, "hasPhoto": 1, "searchPropertyStatus": "INACTIVE", "pageIndex": 1, "isOpenHousesOnly": 0, "minPrice": 0, "minBed": 0, "searchType": "CITY", "searchPropertyStatus":"ACTIVE_AND_PENDING", "sortColumn": "PRICE", "maxCountPerPage": 10, "hasPool": 0, "input": "San Francisco CA", "propertyTypes": ["SINGLE_FAMILY_HOUSE", "CONDO", "MULTI_FAMILY", "LAND", "MOBILE", "OTHER"], "minBath": 0, "sortOrder": "DESC" } }
            if (options.input) {
                postData.conditions.input = options.input;
                if(/^\d{5}$/.test(postData.conditions.input)){
                    postData.conditions.searchType = 'ZIPCODE';
                }
            }
            if (options.pageIndex > 1) {
                postData.conditions.pageIndex = options.pageIndex;
            }
            postData.conditions.maxCountPerPage = options.pageSize || 50;
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
                    if (res && res.data) {
                        responseData = res.data;
                    }
                    return resolve(responseData);
                },
                fail: function (err) {
                    return reject(err);
                }
            })
        });
    }

    getProperty(url){
        return new Promise(function(resolve, reject){
            let requestUrl = `https://appapi.movoto.com/api/getdppdata/?url=${url}`;
            wx.request({
                url: requestUrl,
                method: "GET",
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    let responseData = null;
                    if (res && res.data && res.data.data) {
                        responseData = res.data.data;
                    }
                    return resolve(responseData);
                },
                fail: function (err) {
                    return reject(err);
                }
            })
        })
    }
}

module.exports = PropertyFactory;