function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function formatDate(date, includeTime, ignoreDateIfToday) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hour = "" + d.getHours(),
    minutes = "" + d.getMinutes();
  if (hour.length < 2 || !hour) {
    hour = "0" + hour;
  }
  if (minutes.length < 2 || !minutes) {
    minutes = "0" + minutes;
  }
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (year.toString().length > 2) year = year.toString().slice(2);
  if (!includeTime) {
    return [day, month, year].join("/");
  } else {
    var now = new Date();
    if (ignoreDateIfToday && datesAreOnSameDay(now, d)) {
      return `${hour}:${minutes}`;
    } else {
      return `${hour}:${minutes} ${[day, month, year].join("/")}`;
    }
  }
}
