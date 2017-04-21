var PropertyFactory = require('../../factories/propertyFactory.js');
var app = getApp()
Page({
    data: {
        url: '',
        images: [],
        property: null
    },
    onLoad: function (query) {
        // if (!query || !query.url)
        //     throw new Error('the url is invalid');
        //this.setData({ url: query.url });
        this.setData({ url: 'unincorporated-ca/100_80248785/for-sale/' });
        let propertyFactory = new PropertyFactory();
        propertyFactory.getProperty(this.data.url).then((property) => {
            console.log(property)
            if (!property) {
                throw new Error('The property does not exist.')
            }
            this.setData({images: this.populateImage(property)});
            this.setData({property: property});
        }).catch((err) => {
            app.redirectToError(err);
        })
    },
    populateImage(property){
        let images = [];
        if(property){
            if(property.imagesURL && property.imagesURL.length){
                images = images.concat(property.imagesURL);
            } else{
                images.push(property.tnImgPath);
            }
        }
        return images;
    }
})
