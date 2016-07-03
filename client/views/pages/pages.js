Template.pages.onCreated(function () {
    this.subscribe('currPriceList')
    this.subscribe('currTrothuarList')
    this.subscribe('gallery')
    this.subscribe('pix')
})

Template.pages.onRendered(function () {
    this.autorun(function(c){

        var index = parseInt(Session.get("currentIndex"))
        var img = Pix.find({galId: Session.get("currGalObj")}).fetch()[index];
        if(c.firstRun) return;
        Session.set("clickedImage", img? img.avatar.public_id : null);
    })
})

Template.pages.helpers({
    data: function () {
        var currentPage = Pages.findOne({url: this.url})
        if ((currentPage) && (currentPage.pageContent)) {
            return currentPage.pageContent
        }
    },

    backgroundImage: function() {
        console.log(Pix.find({galId: this._id}).fetch()[0].avatar.url)
        return Pix.find({galId: this._id}).fetch()[0].avatar.url
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
            return Gallery.find();
        }
    },
    thermoPrice: function() {
        return Price.find();
    },
    plitkaPrice: function () {
        return Trothuar.find();
    },


    backgroundImage: function() {
        return Pix.find({galId: this._id}).fetch()[0].avatar.url
    },

    pictures: function() {
        return _.map(Pix.find({galId: Session.get("currGalObj")}).fetch(), function(value, index){
            return {value: value, index: index};
        });;
    },
    imageP: function() {
        return Session.get("clickedImage")
    },
    pixExist: function() {
        return Pix.find({galId: this._id}).fetch()
    }

})

Template.pages.events({
    "click .thumb": function (e, t) {
        $('.preview').css("display", "block")

        Session.set("currentIndex", $(e.currentTarget).attr('index'))
        return false
    },
    "click .closeWindow": function () {
        $('.closeWindow').parent().css("display", "none")
        $('.preview').css("display", "none")
        $('body').css("overflow-y", "scroll")
        return false
    },
    "click #nav-right": function () {
        var index = parseInt(Session.get("currentIndex"));
        var count = Pix.find({galId: Session.get("currGalObj")}).count();
        if(index + 1 >= count){
            index = 0;
        } else {
            index ++;
        }
        Session.set("currentIndex", index)
        return false
    },
    "click #nav-left": function () {
        var index = parseInt(Session.get("currentIndex"));
        var count = Pix.find({galId: Session.get("currGalObj")}).count();
        if(index - 1 < 0){
            index = count-1;
        } else {
            index --;
        }
        Session.set("currentIndex", index)
        return false
    },
    "click .galObject": function(e) {
        Session.set("currGalObj", e.currentTarget.id)
        $('.photoAdd').css("display", "block")
        $('body').css("overflow-y", "hidden")
        console.log(this._id)
        return false;
    }
})