Template.gallery.onCreated(function() {
    this.subscribe("gallery")
    this.subscribe("pages")
})

Template.gallery.onRendered( function() {
        this.$('#globalNode').on('cloudinarydone', function (e, data) {
            Gallery.insert({
                avatar: data.result,
                priceId: Session.get("currPanel")
            })
            console.log(e, data)
        }).on('cloudinaryprogress', function (e, data) {
            // console.log(e, data)
            // TODO progress
        });
        this.autorun(function(c){

            var index = parseInt(Session.get("currentIndex"))
            var img = Gallery.find().fetch()[index];
            if(c.firstRun) return;
            Session.set("clickedImage", img? img.avatar.public_id : null);
        })
    }
)

Template.gallery.helpers({

    pix: function() {
        return _.map(Gallery.find().fetch(), function(value, index){
            return {value: value, index: index};
        });;
    },
    imageP: function() {
        return Session.get("clickedImage")
    }
});

Template.gallery.events({

    "click .thumb": function (e, t) {
        $('.preview').css("display", "block")

        Session.set("currentIndex", $(e.currentTarget).attr('index'))
        return false
    },
    "click .closeWindow": function () {
        $('.closeWindow').parent().css("display", "none")
        return false
    },
    "click #nav-right": function () {
        var index = parseInt(Session.get("currentIndex"));
        var count = Gallery.find().count();
        if(index + 1 >= count){
            index = 0;
        } else {
            index ++;
        }
        Session.set("currentIndex", index)
        return false
    },
    "click #nav-left": function () {
        var index = parseInt(Session.get("currentIndex"));
        var count = Gallery.find().count();
        if(index - 1 <= 0){
            index = count-1;
        } else {
            index --;
        }
        Session.set("currentIndex", index)
        return false
    },
    "click .galleryCreate": function() {
        $('.galleryNewObject').css("display", "block");
        return false
    },
    "submit .createNewObject": function() {
        Pages.insert(
            {
                url: 'gallery',
                pageName: 'Галерея',
                label: 'common',
                secLabel: 'gallery',
                menuPos: '4'
            }
        )
        return false;
    }
});