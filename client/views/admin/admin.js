Template.admin.onCreated(function () {
    var self = this
    self.selectedTemplate = new ReactiveVar();
    this.subscribe('currPriceList')
    this.subscribe('gallery')

})

Template.admin.onRendered(function () {
    var self = this;
    self.autorun(function () {

        self.selectedTemplate.set('default')

    })

})

Template.admin.helpers({
    tempData: function() {

        return Template.instance().selectedTemplate.get()
    },
    priceDesc: function () {
        var currPricePos = Price.find()

        currPricePos.forEach( function(i) {

            }
        )
        return Gallery.find({priceId: i._id}).fetch()
    }
})

Template.admin.events({
    "change #adminSelector": function (e, t) {
        t.selectedTemplate.set($(e.currentTarget).val())

    }
})