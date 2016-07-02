Template.layout.onCreated(function () {

})

Template.layout.onRendered(function () {

})

Template.layout.helpers({
        currentYear: function () {
            var a = new Date().getFullYear();
            if (a > 2015) {
                return "2015-" + a
            } else {
                return a
            }
        }
    }
)

Template.layout.events({})