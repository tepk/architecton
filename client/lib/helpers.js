Template.registerHelper("checkMain", function () {
    return Pages.findOne({label: "main"})
})
