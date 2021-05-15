var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
console.log(mm)
var yyyy = today.getFullYear();

function today() {

  if (dd < 10) {
    var dd = '0' + dd;
  }
  if (mm < 10) {
    var mm = '0' + mm;
  }
  today1 = yyyy + '-' + mm + '-' + dd;
  return toString(today1) ;
}

function dayNow(idclass) {

  if (dd < 10) {
    var dd = '0' + dd;
  }
  if (mm < 10) {
    var mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById(idclass).defaultValue = today
  console.log(today)
}

dayNow('dateNow1');
dayNow('dateNow2');

var arrayDay = [];

function day(dd, mm) {
  if (dd < 10) {
    var dd = '0' + dd;
  }
  if (mm < 10) {
    var mm = '0' + mm;
  }

  var today = yyyy + '-'+ mm + '-' +dd ;
  return today;
}

var arrGetdd = []

function getDayToArr(dd) {
  ddNow = dd;
  for (i = ddNow; i <= dd + 6; i++) {
    arrayDay.push(day(ddNow, mm));
    arrGetdd.push(ddNow);
    ddNow++;
  }
  console.log(arrayDay);
  console.log(arrGetdd);

}

getDayToArr(dd)

arrGetDay = []

function getCurrentDay() {

  for (i = 0; i < arrGetdd.length; i++) {
    var date = new Date(yyyy, mm, parseInt(arrGetdd[i]));
    console.log(date)
    current_day = date.getDay();
    arrGetDay.push(current_day);
  }
  console.log(arrGetDay)
}

getCurrentDay()

function addDayToTable(current) {
  switch (current) {
    case 2 :
      return 'Chủ Nhật';
    case 3 :
      return 'Thứ 2';
      break;
    case 4 :
      return 'Thứ 3';
      break;
    case 5 :
      return 'Thứ 4';
      break;
    case 6 :
      return 'Thứ 5';
      break;
    case 0 :
      return 'Thứ 6';
      break;
    case 1 :
      return 'Thứ 7';
      break;

  }
}

function indexDay(index) {
  switch (index) {
    case 0 :
      document.getElementById('getday1').innerText = arrayDay[index];
      document.getElementById('day1').innerText = addDayToTable(arrGetDay[index]);
      break;
    case 1 :
      document.getElementById('getday2').innerText = arrayDay[index];
      document.getElementById('day2').innerText = addDayToTable(arrGetDay[index]);
      break;
    case 2 :
      document.getElementById('getday3').innerText = arrayDay[index];
      document.getElementById('day3').innerText = addDayToTable(arrGetDay[index]);
      break;
    case 3 :
      document.getElementById('getday4').innerText = arrayDay[index];
      document.getElementById('day4').innerText = addDayToTable(arrGetDay[index]);
      break;
    case 4 :
      document.getElementById('getday5').innerText = arrayDay[index];
      document.getElementById('day5').innerText = addDayToTable(arrGetDay[index]);
      break;
    case 5 :
      document.getElementById('getday6').innerText = arrayDay[index];
      document.getElementById('day6').innerText = addDayToTable(arrGetDay[index]);
      break;
    case 6 :
      document.getElementById('getday7').innerText = arrayDay[index];
      document.getElementById('day7').innerText = addDayToTable(arrGetDay[index]);
      break;
  }

}



function createday() {
  const element = document.createElement('span');
  element.id = 'getday'
  const element2 = document.createElement('span');
  element2.id = 'day'
  var setday = element + '/n'+element2 ;
  return setday ;
}

function tableDay(table1) {
  for (var i = 0; i < 7; i++) {
    setday = document.getElementById('set'+(i+1))
    setday.innerHTML ='<span class="week" id="day'+(i+1)+'"'+'>'+'</span>'+'<br>'+'<span id="getday'+(i+1)+'">'+'</span>';
  }
}

tableDay();
function displayDay() {
  for (i = 0; i < arrGetDay.length; i++) {
    indexDay(i)
  }
}


displayDay();


function openTabs(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openTabs1(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent1");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks1");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

openTabs(event, 'dayOfWeek1');
openTabs(event, 'ttday1');
function khuhoi(){
  document.getElementById('hidden2').style.display= 'block';
}

function motchieu(){
  document.getElementById('hidden2').style.display= 'none';
}

