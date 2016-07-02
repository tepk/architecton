Template.main.onCreated(function () {
    this.subscribe('allPages')
})

Template.main.onRendered(function () {

})

Template.main.helpers({
    data: function () {
        return Pages.findOne({label: 'main'});

    },
    altData: function() {
        return Pages.findOne({label: 'standart'});
    }
})

Template.main.events({

})