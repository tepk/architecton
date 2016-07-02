Template.mainMenu.onCreated(function () {
    this.subscribe('allPages')
})

Template.mainMenu.onRendered(function () {

})

Template.mainMenu.helpers({
    menu: function () {
        return Pages.find({label: 'common'}, {sort: {menuPos: -1}})
    },
    homepage: function () {
        return Pages.findOne({label: 'main'}) || Pages.findOne({label: 'standart'})
    },
    isCurrentUrl: function (url) {
        return Router.current().url === url;
    }
})

Template.mainMenu.events({})