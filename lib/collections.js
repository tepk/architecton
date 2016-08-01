Pages = new Mongo.Collection("pages");
Price = new Mongo.Collection("price");
Gallery = new Mongo.Collection("gallery");
Trothuar = new Mongo.Collection("trothuar");
Pix = new Mongo.Collection("pix");
Slider = new Mongo.Collection("slider")
Deleted = new Mongo.Collection("deleted")


Meteor.methods({
    'priceList/generate_pdf': function() {

        if (Meteor.isServer) {
            var webshot = Meteor.npmRequire('webshot');
            var fs      = Npm.require('fs');
            var Future  = Npm.require('fibers/future');
            var fut = new Future();

            var fileName = "price-list.pdf";

            var css = Assets.getText('style.css');

            SSR.compileTemplate('layout', Assets.getText('layout.html'));

            Template.layout.helpers({
                getDocType: function() {
                    return "<!DOCTYPE html>";
                }
            });

            SSR.compileTemplate('price_list', Assets.getText('priceList.html'));

// PREPARE DATA
            var price = Price.find({});
            var data = {
                data: price
            }


            var html_string = SSR.render('layout', {
                css: css,
                template: "price_list",
                data: data

            });

            console.log(html_string);
            var options = {
                "paperSize": {
                    "format": "A4",
                    "orientation": "landscape",
                    "margin": "1cm"
                },
                siteType: 'html'
            };
            console.log("Commencing webshot...");
            webshot(html_string, fileName, options, function(err) {
                fs.readFile(fileName, function (err, data) {
                    if (err) {
                        return console.log(err);
                    }

                    fs.unlinkSync(fileName);
                    fut.return(data);
                });
            });

            var pdfData = fut.wait();
            var base64String = new Buffer(pdfData).toString('base64');

            return base64String;

        }

    }
});