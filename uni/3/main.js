// Это было совсем необязательно, но мне очень хотелось
window.onload = function () {
  let footer = document.getElementById("footer-year");
  footer.innerHTML = new Date().getFullYear();
};
