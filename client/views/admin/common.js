Template.common.onCreated(function () {

})

Template.common.onRendered(function () {
    Meteor.setTimeout(function () {
        $("#cleditorSt").cleditor()
    }, 500);
})

Template.common.helpers({

})

Template.common.events({
    "submit .createCommon": function (e, t) {
        Pages.insert(
            {
                url: $('#pageUrl').val(),
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val(),
                label: 'common'
            }
        )
        return false;
    }
})