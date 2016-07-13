Template.layout.onCreated(function () {
    this.subscribe('allPages')
})

Template.layout.onRendered(function () {

})

Template.layout.helpers({
        currentYear: function () {
            var a = new Date().getFullYear();
            if (a > 2016) {
                return "2016-" + a
            } else {
                return a
            }
        },
        commonPages: function() {
            return Pages.find({label: "common"}, {sort: {menuPos: 1}})
        },
        tableWidth: function () {
            return 100/(Pages.find({label: "common"}).count()+1)
        },
        homepage: function () {
            return Pages.findOne({label: 'main'}) || Pages.findOne({label: 'standart'})
        },
        isCurrentUrl: function () {
            var baseUrl = ('/pages/' + (Pages.findOne(this._id).url))
            if (baseUrl == (Router.current().url)) {
                return true
            }
        },
        mainPage: function () {
            var m = 'http://' + $(location).attr('host') + '/';
            console.log(m)
            if ((Router.current().url == '/') || (Router.current().url == m)) {
                return true
            }
        }
    }
)

Template.layout.events({

})