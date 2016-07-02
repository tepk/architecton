Template.price.onCreated(function () {

})

Template.price.onRendered(function () {
    Meteor.setTimeout(function () {
        $("#cleditorSt").cleditor()
    }, 500);
})

Template.price.helpers({
    priceExists: function () {
        return Pages.findOne({secLabel: 'price'})
    }
})

Template.price.events({
    "submit .editContent": function (e, t) {
        console.log(e.currentTarget)
        Pages.update(e.currentTarget.id, {
            $set: {
                url: $('#pageUrl').val(),
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val()
            }
        })
        return false
    },
    "submit .createContent": function (e, t) {
        Pages.insert(
            {
                url: $('#pageUrl').val(),
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val(),
                label: 'common',
                secLabel: 'price',
                menuPos: '3'
            }
        )
        return false;
    }
})