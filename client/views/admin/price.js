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
    },
    chapterActive: function() {
        return Pages.findOne({secLabel: 'price'}).chapterActive
    },
})

Template.price.events({
    "submit .editContent": function (e, t) {
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
    },
    "click .chapterActive": function() {
        var currState = Pages.findOne({secLabel: "price"}).chapterActive
        var currId = Pages.findOne({secLabel: "price"})._id
        console.log(!currState)
        Pages.update({_id: currId}, {
            $set: {
                chapterActive: (!currState)
            }
        })
        return false
    }
})