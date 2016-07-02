Template.trothuar.onCreated(function () {
    this.subscribe('currTrothuarList')
    this.subscribe('gallery')
    var self = this
    self.selectedPanel = new ReactiveVar();
})

Template.trothuar.onRendered(function (){
    Meteor.setTimeout(function () {
        $("#cleditorSt").cleditor()
    }, 500);
    this.$('#globalNode').on('cloudinarydone', function (e, data) {
        var profileAvatar = "3"
        Gallery.insert({
            avatar: data.result,
            priceId: Session.get("currPanel")
        })
        console.log(e, data)
    }).on('cloudinaryprogress', function (e, data) {
        // console.log(e, data)
        // TODO progress
    });

})

Template.trothuar.helpers({
    trothuarExists: function () {
        return Pages.findOne({secLabel: 'trothuar'})
    },
    price: function () {
        return Trothuar.find();
    },
    editCurrPrice: function() {
        return Trothuar.findOne({_id: Session.get("currPanel")})
    },
    images: function () {
        return Gallery.find({priceId: Session.get("currPanel")})
    }
})

Template.trothuar.events({
    "submit .createContent": function (e, t) {
        Pages.insert(
            {
                url: $('#pageUrl').val(),
                pageName: $('#pageName').val(),
                pageContent: $('#cleditorSt').val(),
                label: 'common',
                secLabel: 'trothuar',
                menuPos: '2'
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
        Trothuar.insert({
            panelImage: '/images/plitka.jpg',
            panelName: $('.panelName').val(),
            panelSqr: $('.panelSqr').val(),
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
        Trothuar.findOne({_id: e.currentTarget.id})
        $('#editCurrPanel').css("display", "block")
        Session.set("currPanel", e.currentTarget.id)
        console.log(e.currentTarget.id)
    },
    "submit .editCurrPrice": function () {
        Trothuar.update(Session.get('currPanel'), {
            $set: {
                panelName: $('.ePanelName').val(),
                panelSqr: $('.ePanelSqr').val(),
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