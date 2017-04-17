Page({
    data: {
        url: ''
    },
    onLoad: function (query) {
        if (!query || !query.url)
            throw new Error('the url is invalid');
        this.setData({ url: query.url });
    }
})
