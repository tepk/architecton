Template.pages.onCreated(function () {
    this.subscribe('currPriceList')
    this.subscribe('currTrothuarList')
})

Template.pages.onRendered(function () {

})

Template.pages.helpers({
    data: function () {
        var currentPage = Pages.findOne({url: this.url})
        if ((currentPage) && (currentPage.pageContent)) {
            return currentPage.pageContent
        }
    },
    thermoPanel: function() {
        var currentPage = Pages.findOne({url: this.url})
        if ((currentPage) && (currentPage.secLabel) && (currentPage.secLabel === "thermo")) {
            console.log(Price.find().fetch())
            return Price.find();
        }
    },
    plitka: function() {
        var currentPage = Pages.findOne({url: this.url})
        if ((currentPage) && (currentPage.secLabel) && (currentPage.secLabel === "trothuar")) {
            return Trothuar.find();
        }
    },
    price: function() {
        var currentPage = Pages.findOne({url: this.url})
        if ((currentPage) && (currentPage.secLabel) && (currentPage.secLabel === "price")) {
            return true;
        }
    },
    gallery: function() {
        var currentPage = Pages.findOne({url: this.url})
        if ((currentPage) && (currentPage.secLabel) && (currentPage.secLabel === "gallery")) {
            return true;
        }
    },
    thermoPrice: function() {
        return Price.find();
    },
    plitkaPrice: function () {
        return Trothuar.find();
    }
})

Template.pages.events({

})