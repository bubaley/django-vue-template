// read bootstrap.js
export default {
    methods: {
        calendarDateTime: date => window.moment.utc(date, 'YYYY-MM-DD HH:mm:ss').local().calendar(),
        calendarDate: date => window
            .moment
            .utc(date, 'YYYY-MM-DD HH:mm:ss')
            .local()
            .calendar()
            .split(',')[0]
            .replace(` ${moment().year()} г.`, ''),
    }
}
