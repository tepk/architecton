Template.password.onCreated(function () {

})

Template.password.onRendered(function () {
    Session.set("passwordInput", '')
})

Template.password.helpers({

})

Template.password.events({
    "keyup #passwordInput": function() {
        Session.set("passwordInput", $('#passwordInput').val())

        Meteor.loginWithPassword('admin', Session.get("passwordInput"), function (err) {
            if (err) {
                console.log('error')

                // toastr.error('Неверная пара логин/пароль', 'Ошибка');
            }
            // The user might not have been found, or their password
            // could be incorrect. Inform the user that their
            // login attempt has failed.
            else
                console.log('success')

                // toastr.success('Выполнен вход в систему', 'Выполнено');              // The user has been logged in.
        });
        return false;
    }
})