Template.homepage.onCreated(function () {

})

Template.homepage.onRendered(function () {
    Meteor.setTimeout(function () {
        $("#cleditorSt").cleditor()
    }, 500);
})

Template.homepage.helpers({
    mainExists: function() {
        return Pages.findOne({label: 'main'})
    }
})

Template.homepage.events({
    "submit .newPage": function (e, t) {
        Pages.insert(
            {
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val(),
                label: 'main'
        }
        )
        return false;
    },
    "submit .editPage": function (e, t) {
        Pages.update(e.currentTarget.id, {
            $set: {
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val()
            }
        })
        return false
    }
})