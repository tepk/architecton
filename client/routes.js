Router.configure({
  layoutTemplate: 'layout',
  layoutTemplate: 'passwordLayout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'main', layoutTemplate: 'layout'});
Router.route('/password', {name: 'password', layoutTemplate: 'layout'});
Router.route('/admin', {name: 'admin', layoutTemplate: 'layout'});
Router.route('/pages/:url', function () {
  var params = this.params;

  var url = params.url;
  this.render('pages', {
    data: function () {
      return {url: this.params.url};
    }
  });

}, {name: 'pages', layoutTemplate: 'layout'});
