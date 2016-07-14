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
    "click .currPic": function(e) {
        if (confirm("Действительно хотите восстановить?")) {
            console.log(this)
            Pix.insert(this)
            Deleted.remove(this._id)
            return true
        } else {
            return false
        }
    }

})