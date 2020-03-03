var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

toTitleCase = str => {
  return str
    .split(/-/g)
    .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");
};

var subject = toTitleCase(getUrlParameter("subject"));

document.getElementById("field_e6lis62").value = subject;
