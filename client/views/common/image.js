Template.image.onCreated( function() {

    }

)

Template.registerHelper("imageUrl", function(image, transform){
    return $.cloudinary.url(image.public_id, {transformation: transform});
});