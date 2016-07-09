Template.gallery.onCreated(function() {
    this.subscribe("gallery")
    this.subscribe("pages")
    this.subscribe("pix")
})

Template.gallery.onRendered( function() {
        this.$('#globalNode').on('cloudinarydone', function (e, data) {
            Pix.insert({
                avatar: data.result,
                galId: Session.get("currGalObj")
            })
            console.log(e, data)
        }).on('cloudinaryprogress', function (e, data) {
            // console.log(e, data)
            // TODO progress
        });
        this.autorun(function(c){

            var index = parseInt(Session.get("currentIndex"))
            var img = Pix.find({galId: Session.get("currGalObj")}).fetch()[index];
            if(c.firstRun) return;
            Session.set("clickedImage", img? img.avatar.public_id : null);
            Session.set("clickedImageI", img? (img._id) : null);
        })
    }
)

Template.gallery.helpers({
    galleryExists: function() {
      return Gallery.find()
    },

    backgroundImage: function() {
      return Pix.find({galId: this._id}).fetch()[0].avatar.url
    },

    pictures: function() {
        var galId = Pix.find({galId: Session.get("currGalObj")})._id
        return _.map(Pix.find({galId: Session.get("currGalObj")}).fetch(), function(value, index){
            return {value: value, index: index};
        }, galId);;
    },
    imageP: function() {
        return Session.get("clickedImage")
    },
    imageI: function() {
        return Session.get("clickedImageI")
    },
    pixExist: function() {
        return Pix.find({galId: this._id}).fetch()
    }
});

Template.gallery.events({

    "click .thumb": function (e, t) {
        $('.preview').css("display", "block")
        Session.set("currentIndex", $(e.currentTarget).attr('index'))
        console.log(Pix.findOne({_id: $(e.currentTarget).attr('index')}))
        return false
    },
    "click .closeWindow": function () {
        $('.closeWindow').parent().css("display", "none")
        $('.preview').css("display", "none")
        $('body').css("overflow-y", "scroll")
        return false
    },
    "click #nav-right": function () {
        var index = parseInt(Session.get("currentIndex"));
        var count = Pix.find({galId: Session.get("currGalObj")}).count();
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
        var count = Pix.find({galId: Session.get("currGalObj")}).count();
        if(index - 1 < 0){
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
    "click .galNewObject": function() {
        $('.galleryNewObject').css("display", "block");
        return false
    },


    "submit .createNewObject": function() {
        if (!Pages.findOne({secLabel: "gallery"})) {
            Pages.insert(
                {
                    url: 'gallery',
                    pageName: 'Галерея',
                    label: 'common',
                    secLabel: 'gallery',
                    menuPos: '4'
                }
            ),
                Gallery.insert({
                    object: $('.objectName').val(),
                    description: $('.objectDesc').val()
                })
            $('.createNewObject')[0].reset();
            $('.galleryNewObject').css("display", "none");
            return false;
        } else {
            Gallery.insert({
                object: $('.objectName').val(),
                description: $('.objectDesc').val()
            })
            $('.createNewObject')[0].reset();
            $('.galleryNewObject').css("display", "none");
            return false;
        }
    },
    "click .galObject": function(e) {
        Session.set("currGalObj", e.currentTarget.id)
        $('.photoAdd').css("display", "block")
        $('body').css("overflow-y", "hidden")
        console.log(this._id)
        return false;
    },
    "click .trash": function(e) {
        var currObjImg = Pix.findOne({_id: e.currentTarget.id})
        if (confirm('Вы действительно хотите удалить фотографию? На всякий случай, мы будем хранить ее в удаленных объектах')) {
            Deleted.insert(currObjImg)
            Pix.remove(e.currentTarget.id)
            return false
        } else {
            return false
        }
    }
});