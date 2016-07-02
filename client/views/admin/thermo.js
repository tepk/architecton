Template.thermo.onCreated(function () {
    this.subscribe('currPriceList')
    this.subscribe('gallery')
    var self = this
    self.selectedPanel = new ReactiveVar();
})

Template.thermo.onRendered(function (){
    Meteor.setTimeout(function () {
        $("#cleditorSt").cleditor()
    }, 500);


})

Template.thermo.helpers({
    priceExists: function () {
        return Pages.findOne({secLabel: 'thermo'})
    },
    price: function () {
        return Price.find();
    },
    editCurrPrice: function() {
        return Price.findOne({_id: Session.get("currPanel")})
    }
})

Template.thermo.events({
    "submit .createContent": function (e, t) {
        Pages.insert(
            {
                url: $('#pageUrl').val(),
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val(),
                label: 'common',
                secLabel: 'thermo',
                menuPos: '1'
            }
        )
        return false;
    },
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
    "submit .editFulling": function (e, t) {
        Price.insert({
            panelImage: '/images/default.jpg',
            panelName: $('.panelName').val(),
            panelLength: $('.panelLength').val(),
            panelHeight: $('.panelHeight').val(),
            panelDepth: $('.panelDepth').val(),
            panelWeight: $('.panelWeight').val(),
            panelPrice: $('.panelPrice').val()
        })
        $('.editFulling')[0].reset();
        return false
    },

    "click .contentFulling": function () {
        if ($('.contentFulling')[0].checked === true) {
            $('.editContent').css("display", "none");
            $('.editFulling').css("display", "block");

        } else {
            $('.editFulling').css("display", "none");
            $('.editContent').css("display", "block");
        }
    },
    "click .currPanel": function (e, t) {
        Price.findOne({_id: e.currentTarget.id})
        $('#editCurrPanel').css("display", "block")
        Session.set("currPanel", e.currentTarget.id)
        console.log(e.currentTarget.id)
    },
    "submit .editCurrPrice": function () {
        Price.update(Session.get('currPanel'), {
            $set: {
                panelName: $('.ePanelName').val(),
                panelLength: $('.ePanelLength').val(),
                panelHeight: $('.ePanelHeight').val(),
                panelDepth: $('.ePanelDepth').val(),
                panelWeight: $('.ePanelWeight').val(),
                panelPrice: $('.ePanelPrice').val()
            }
        })
        $('#editCurrPanel').css("display", "none");
        return false
    },
    "click .closeWindow": function () {
        $('#editCurrPanel').css("display", "none")
        return false
    }

})