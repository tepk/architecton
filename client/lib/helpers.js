Template.registerHelper("checkMain", function () {
    console.log(Pages.findOne({label: "main"}))
    console.log(this)
    return Pages.findOne({label: "main"})
})
