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


export const removeZeros = (array) => {
    if(parseInt(array[0]) === 0){
        array.shift()
        removeZeros(array)
    }
    return array.join('')
}

export const filterApiCallData = (data, formattedDate, searchSpan) => {
    if(searchSpan !== "week"){
        return data.filter(crime => crime.date.includes(formattedDate))
    }else if(searchSpan === "week") {
        return data.filter(crime => (crime.date.includes(formattedDate[0]) || crime.date.includes(formattedDate[1]) || crime.date.includes(formattedDate[2]) || crime.date.includes(formattedDate[3]) || crime.date.includes(formattedDate[4]) || crime.date.includes(formattedDate[5]) || crime.date.includes(formattedDate[6])))
    }
}


export const homicideApiCall = async(props) => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0110&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0130&$limit=50000&$offset=0')
    let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0141&$limit=50000&$offset=0')
    let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0142&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    let data3 = await res3.json()
    let data4 = await res4.json()
    return [...data1, ...data2, ...data3, ...data4]
}

export const sexAssaultApiCall = async() => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0261&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0262&$limit=50000&$offset=0')
    let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0271&$limit=50000&$offset=0')
    let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0272&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    let data3 = await res3.json()
    let data4 = await res4.json()
    return [...data1, ...data2, ...data3, ...data4]
}

export const robberyApiCall = async() => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=031A&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=031B&$limit=50000&$offset=0')
    let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=033A&$limit=50000&$offset=0')
    let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=033B&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    let data3 = await res3.json()
    let data4 = await res4.json()
    return [...data1, ...data2, ...data3, ...data4]
}

export const batteryApiCall = async() => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=041A&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=041B&$limit=50000&$offset=0')
    let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0450&$limit=50000&$offset=0')
    let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0451&$limit=50000&$offset=0')
    let res5 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0480&$limit=50000&$offset=0')
    let res6 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0481&$limit=50000&$offset=0')
    let res7 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0488&$limit=50000&$offset=0')
    let res8 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0489&$limit=50000&$offset=0')
    let res9 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0490&$limit=50000&$offset=0')
    let res10 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0491&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    let data3 = await res3.json()
    let data4 = await res4.json()
    let data5 = await res5.json()
    let data6 = await res6.json()
    let data7 = await res7.json()
    let data8 = await res8.json()
    let data9 = await res9.json()
    let data10 = await res10.json()
    return [...data1, ...data2, ...data3, ...data4, ...data5, ...data6, ...data7, ...data8, ...data9, ...data10]

}

export const assaultApiCall = async() => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=051A&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=051B&$limit=50000&$offset=0')
    let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0550&$limit=50000&$offset=0')
    let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0551&$limit=50000&$offset=0')
    let res5 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0555&$limit=50000&$offset=0')
    let res6 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0556&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    let data3 = await res3.json()
    let data4 = await res4.json()
    let data5 = await res5.json()
    let data6 = await res6.json()
    return [...data1, ...data2, ...data3, ...data4, ...data5, ...data6]
}

export const gunViolationApiCall = async() => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=141A&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=141B&$limit=50000&$offset=0')
    let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=142A&$limit=50000&$offset=0')
    let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=142B&$limit=50000&$offset=0')
    let res5 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=143A&$limit=50000&$offset=0')
    let res6 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=143B&$limit=50000&$offset=0')
    let res7 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=143C&$limit=50000&$offset=0')
    let res8 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1450&$limit=50000&$offset=0')
    let res9 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1460&$limit=50000&$offset=0')
    let res10 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1475&$limit=50000&$offset=0')
    let res11 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1476&$limit=50000&$offset=0')
    let res12 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1477&$limit=50000&$offset=0')
    let res13 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1478&$limit=50000&$offset=0')
    let res14 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1479&$limit=50000&$offset=0')
    let res15 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1480&$limit=50000&$offset=0')
    let res16 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=1481&$limit=50000&$offset=0')
    let res17 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=2900&$limit=50000&$offset=0')
    let res18 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=5008&$limit=50000&$offset=0')
    let res19 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=5110&$limit=50000&$offset=0')
    let res20 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=5111&$limit=50000&$offset=0')
    let res21 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=5112&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    let data3 = await res3.json()
    let data4 = await res4.json()
    let data5 = await res5.json()
    let data6 = await res6.json()
    let data7 = await res7.json()
    let data8 = await res8.json()
    let data9 = await res9.json()
    let data10 = await res10.json()
    let data11 = await res11.json()
    let data12 = await res12.json()
    let data13 = await res13.json()
    let data14 = await res14.json()
    let data15 = await res15.json()
    let data16 = await res16.json()
    let data17 = await res17.json()
    let data18 = await res18.json()
    let data19 = await res19.json()
    let data20 = await res20.json()
    let data21 = await res21.json()
    return [...data1, ...data2, ...data3, ...data4, ...data5, ...data6, ...data7, ...data8, ...data9, ...data10, ...data11, ...data12, ...data13, ...data14, ...data15, ...data16, ...data17, ...data18, ...data19, ...data20, ...data21]
}

export const carjackApiCall = async() => {
    let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0325&$limit=50000&$offset=0')
    let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0326&$limit=50000&$offset=0')
    let data1 = await res1.json()
    let data2 = await res2.json()
    return [...data1, ...data2]
}

export const neighborhoodObject = {'Select Neighborhood': [41.881952, -87.629439], 'Rogers Park': [42.009390, -87.676413], 'Washington Park': [41.793904, -87.618180], 'West Ridge': [42.003876, -87.696190], 'Hyde Park': [41.794544, -87.594070], 'Uptown': [41.966832, -87.655495], 'Woodlawn': [41.780785, -87.599069],
'Lincoln Square': [41.969446, -87.689728], 'South Shore': [41.759234, -87.575587], 'North Center': [41.956640, -87.679314], 'Chatham': [41.741420, -87.612382], 'Lake View': [41.940720, -87.652870], 'Avalon Park': [41.745920, -87.594160], 'Lincoln Park': [41.920180, -87.636390], 'South Chicago': [41.735134, -87.551309], 
'Near North Side': [41.901219, -87.634505], 'Burnside': [41.730202, -87.596861], 'Edison Park': [42.004662, -87.811923], 'Calumet Heights': [41.730207, -87.579359], 'Norwood Park': [41.988588, -87.803159], 'Roseland': [41.693720, -87.623130], 'Jefferson Park': [41.969934, -87.763186], 'Pullman': [41.692737, -87.606391], 
'Forest Glen': [41.986070, -87.747150], 'South Deering': [41.701596, -87.557132], 'North Park': [41.981595, -87.720694], 'East Side': [41.714303, -87.532713], 'Albany Park': [41.970499, -87.715989], 'West Pullman': [41.675784, -87.638601], 'Portage Park': [41.958214, -87.765554], 'Riverdale': [41.668232, -87.605052], 
'Irving Park': [41.954113, -87.736874], 'Hegewisch': [41.649950, -87.547810], 'Dunning': [41.950400, -87.793810], 'Garfield Ridge': [41.793328, -87.782120], 'Montclare': [41.925526, -87.800946], 'Archer Heights': [41.809470, -87.707620], 'Belmont Cragin': [41.931912, -87.770399], 'Brighton Park': [41.818984, -87.698870],
'Hermosa': [41.928761, -87.734423], 'McKinley Park': [41.832207, -87.673420], 'Avondale': [41.939013, -87.711164], 'Bridgeport': [41.838067, -87.651060], 'Logan Square': [41.929270, -87.712950], 'New City': [41.806380, -87.655200], 'Humboldt Park': [41.904449, -87.720814], 'West Elsdon': [41.793860, -87.714000], 'West Town': [41.901938, -87.686308], 
'Gage Park': [41.796912, -87.695530], 'Austin': [41.889101, -87.764742], 'Clearing': [41.785470, -87.774210], 'West Garfield Park': [41.883177, -87.729541], 'West Lawn': [41.775664, -87.722333], 'East Garfield Park': [41.883533, -87.702649], 'Chicago Lawn': [41.771780, -87.695650], 'Near West Side': [41.882447, -87.667166], 
'West Englewood': [41.779027, -87.667143], 'North Lawndale': [41.860820, -87.718469], 'Englewood': [41.780569, -87.645529], 'South Lawndale': [41.844309, -87.712214], 'Greater Grand Crossing': [41.759289, -87.615048], 'Lower West Side': [41.852350, -87.666980], 'Ashburn': [41.748007, -87.710779], 
'Loop': [41.881952, -87.629439], 'Auburn Gresham': [41.744610, -87.657220], 'Near South Side': [41.900628, -87.634497], 'Beverly': [41.718735, -87.671748], 'Armour Square': [41.841086, -87.632605], 'Washington Heights': [41.707480, -87.652052], 'Douglas': [41.835290, -87.618023], 'Mount Greenwood': [41.691490, -87.704890], 
'Oakland': [41.824276, -87.605605], 'Morgan Park': [41.691630, -87.666019], 'Fuller Park': [41.818760, -87.632152], 'Ohare': [41.980421, -87.909416], 'Grand Boulevard': [41.814213, -87.617128], 'Edgewater': [41.983643, -87.663892],}

export const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]