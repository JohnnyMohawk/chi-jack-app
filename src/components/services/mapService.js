export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

export const formatDay = (day) => {
    if (day.toString().length < 2) 
        day = '0' + day;
    return day
}

export const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        let day = formatDate(new Date(date)).split("-")[2]
        days.push(day);
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export const yearRange = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export const getDaysArray = (start, end) => {
    for(var weekArr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        weekArr.push(new Date(dt));
    }
    return weekArr;
};

export const createWeekArr = (date) => {
    let weekStart = new Date(date)
    weekStart.setDate(weekStart.getDate() - 5)
    let weekEnd = new Date(date)
    weekEnd.setDate(weekEnd.getDate() + 1)
    let daysArray = getDaysArray(weekStart, weekEnd)
    let formatDaysArr = []
    daysArray.forEach(day => {
        formatDaysArr.push(formatDate(day.toDateString()))
    });
    return formatDaysArr
}