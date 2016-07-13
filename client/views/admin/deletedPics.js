Template.deletedPics.onCreated(function () {
    this.subscribe("deleted")
})

Template.deletedPics.onRendered(function () {

})

Template.deletedPics.helpers({
    deletedImages: function () {
        return Deleted.find()
    },
    parentObj: function() {
        return Gallery.findOne({_id: this.galId})
    }
})

Template.deletedPics.events({

})