Page({
  data: {
    userInput: '',
    imgUrls: [
      'http://pi.movoto.com/p/100/ML81645659_0_eBUnJQ_t.jpeg',
      'http://pi.movoto.com/p/100/ML81645659_0_Y2yVRj.jpeg',
      'http://pi.movoto.com/p/100/ML81645659_0_fBrq7U.jpeg'
    ]
  },
  updateInputText: function(e){
    this.data.userInput = e.detail.value;
  },
  performSearch:function(e){
    console.log(this.data.userInput)
  }
})
