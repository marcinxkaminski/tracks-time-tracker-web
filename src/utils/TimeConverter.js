function addZero(time) {
    if (time < 10 && time > 0) {
        time = '0' + time;
    }
    return ''+time;
}

export const TimeConverter = {
    createDate: function (year, month, day){
        return year + '-' + addZero(month) + '-' + addZero(day);
    },

    getTodaysDate: function () {
        const d = new Date();
        return d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate()) + ' ' + addZero(d.getHours()) + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
    },

    getTodaysDateWithoutTime: function (date) {
        const d = !date ? new Date() : new Date(date);
        return d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate());
    },

    getCurrentTime: function () {
        const d = new Date();
        return d.getTime();
    },

    getTimeDifferenceInSeconds: function (time) {
        if (time) {
            const d = new Date();
            return Math.ceil((d.getTime() - time) / 1000);
        }
        return 0;
    },

    getSecondsPart: function (time) {
        if (time) {
            return addZero(Math.floor(time % 3600 % 60));
        }
        else {
            return 0
        }
    },

    getMinutesPart: function (time) {
        if (time) {
            return addZero(Math.floor(time % 3600 / 60));
        }
        else {
            return 0
        }
    },

    getHoursPart: function (time) {
        if (time) {
            return addZero(Math.floor(time / 3600));
        }
        else {
            return 0
        }
    },

    getDatePart: function (dateAndtime) {
        if(dateAndtime){
            return dateAndtime.split(' ')[0];
        }
        else {
            return '-';
        }
    },

    getYearPart: function (date) {
        date = this.getTodaysDateWithoutTime(date);
        if (date) {
            return Number(date.split('-')[0]);
        }
        else {
            return 0;
        }
    },

    getMonthPart: function (date) {
        date = this.getTodaysDateWithoutTime(date);
        if (date) {
            return Number(date.split('-')[1]);
        }
        else {
            return 0;
        }
    },

    getDayPart: function (date) {
        date = this.getTodaysDateWithoutTime(date);
        if (date) {
            return Number(date.split('-')[2]);
        }
        else {
            return 0;
        }
    },

    getMoneyEarned: function (time, price) {
        if (time && price) {
            return Math.ceil(time / 3600 * price);
        }
        else {
            return 0;
        }
    },

    isBetweenDates: function (date, from, to){
        date = new Date(this.getDatePart(date));
        from = new Date(this.getDatePart(from));
        to = new Date(this.getDatePart(to));
        return date >= from && date <= to;
    }
};
