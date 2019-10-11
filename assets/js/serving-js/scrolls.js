countryInfo.addEventListener("scroll", function() {
  let pageTop = countryInfo.offsetTop;
  let pageBottom = pageTop + window.innerHeight;
  let tagsList = document
    .getElementById("opportunities-grid")
    .querySelectorAll("*");

  for (let i = 0; i < tagsList.length; i++) {
    let tag = tagsList[i];
    let tagChildren = tag.children;

    for (let x = 0; x < tagChildren.length; x++) {
      let thisTag = tagChildren[x];
      let rect = thisTag.getBoundingClientRect();

      if (rect.top < pageTop - 50) {
        thisTag.classList.add("fade-out");
      } else {
        thisTag.classList.remove("fade-out");
      }
    }
  }
});
