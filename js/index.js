const baseUrl = 'https://skypro-rock-scissors-paper.herokuapp.com';

window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screenName) {
        window.application.timers.forEach(time => {
            clearInterval(time);
        });

        window.application.timers = [];

        this.screens[screenName]()
    },
    renderBlock: function (blockName, container) {
        window.application.blocks[blockName](container)
    },
    timers: [],
}

