window.axios = require("axios");
window.axios.defaults.headers.common = {"X-Requested-With": "XMLHttpRequest"};
window.axios.defaults.headers.common = {"Accept-Language": "ru-ru"};
window.axios.defaults.baseURL =
    process.env.NODE_ENV !== "production" ? "http://127.0.0.1:8000" : "";


// if you want use moment install. Add this packages in package.json
//  "moment": "^2.24.0",
//  "moment-timezone": "^0.5.28",

// window.moment = require('moment-timezone')
// window.moment.updateLocale('ru', {
//     calendar: {
//         lastDay: '[вчера,] LT',
//         sameDay: '[сегодня,] LT',
//         nextDay: '[завтра,] LT',
//         lastWeek: 'LLL',
//         nextWeek: 'LLL',
//         sameElse: 'LLL',
//     },
// })
