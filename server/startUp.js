Meteor.startup(function () {
    var mainPage = Pages.findOne({label: 'main'});
    if (mainPage) {
        console.log('homepage is already created, using it as main')

    } else {
        console.log("there is no homepage, create it. till that we'll use standart page")
        var standartPage = Pages.findOne({label: 'standart'});
        if (!standartPage) {
            Pages.insert({
                url: '/',
                pageName: 'Стандартная главная',
                pageContent: '<h1>Если вы&nbsp;видите эту страницу&nbsp;&mdash; значит проект еще только был развернут и&nbsp;находится в&nbsp;стадии заполнения.</h1> <div>Нельзя быть точно уверенным, в&nbsp;какой момент проект будет заполнен на&nbsp;100%, так что запаситесь терпением.</div> <div>Если&nbsp;же вы&nbsp;&mdash; владелец этого проекта, настоятельно рекомендуем заполнить его как можно быстрее, чтобы ваши посетители никогда не&nbsp;увидели эту страницу.</div> <div>С&nbsp;уважением, разработчик MBAP.</div>',
                label: 'standart'
            })
            console.log('first run')
        } else {
            console.log('second run')
        }
    }



})


