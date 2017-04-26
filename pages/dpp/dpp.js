var PropertyFactory = require('../../factories/propertyFactory.js');
var app = getApp()
Page({
    data: {
        url: '',
        images: [],
        property: null,
        disclaimer: '',
        hiddenLoading: true
    },
    onLoad: function (query) {
        if (!query || !query.url)
            throw new Error('the url is invalid');
        this.setData({ url: query.url });
        // this.setData({ url: 'brooklyn-ny/9707-4th-ave-apt-5w-brooklyn-ny-11209-482_2928875/for-sale/' });
        this.setData({ hiddenLoading: false });
        let propertyFactory = new PropertyFactory();
        propertyFactory.getProperty(this.data.url).then((property) => {
            if (!property) {
                throw new Error('The property does not exist.')
            }
            this.setData({ images: this.populateImage(property) });
            this.setData({ property: property });
            this.poppulateDisclaimer(property);
            this.setData({ hiddenLoading: true });
        }).catch((err) => {
            this.setData({ hiddenLoading: true });
            app.redirectToError(err);
        })
    },
    populateImage(property) {
        let images = [];
        if (property) {
            if (property.imagesURL && property.imagesURL.length) {
                images = images.concat(property.imagesURL);
            } else {
                images.push(property.tnImgPath);
            }
        }
        return images;
    },
    poppulateDisclaimer(property) {
        let disclaimer = property.mls.disclaimer;
        var date = new Date();
        if(disclaimer){
            disclaimer = disclaimer.replace("[CURRENT_YEAR]", date.getFullYear());
            disclaimer = disclaimer.replace("[TM_SUPERSCRIPT]","TM");
        }
        this.setData({ disclaimer: disclaimer });
    },
    onCardTap(e) {
        if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.url) {
            wx.navigateTo({
                url: `../dpp/dpp?url=${e.currentTarget.dataset.url}`
            })
        }
    }
})
