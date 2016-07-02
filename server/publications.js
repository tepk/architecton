Meteor.publish('singlePage', function(pageUrl){
    return Pages.find({url: pageUrl});
})

Meteor.publish('allPages', function() {
    return Pages.find();
})

Meteor.publish('currPriceList', function() {
    return Price.find();
})

Meteor.publish('currTrothuarList', function() {
    return Trothuar.find();
})

Meteor.publish('gallery', function() {
    return Gallery.find();
})