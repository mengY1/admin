function formatTen(num) {
  return num > 9 ? (num + "") : ("0" + num);
}

function changeTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + "-" + formatTen(month) + "-" + formatTen(day);
}

export default changeTime;