Template.uploadImage.onCreated(function () {

})

Template.uploadImage.onRendered(function () {
    var self = this;
    self.uploadTag = $.cloudinary.unsigned_upload_tag("l35vvwy7");
    self.$("#uploadImage").append(this.uploadTag);
})