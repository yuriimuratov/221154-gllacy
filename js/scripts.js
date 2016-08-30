ymaps.ready(function() {
  var a = new ymaps.Map("ya-map", {
      center: [59.939346, 30.329383],
      zoom: 16,
      controls: []
    }, {
      suppressMapOpenBlock: !0
    }, {
      searchControlProvider: "yandex#search"
    }),
    b = new ymaps.Placemark([59.938669, 30.323057], {}, {
      iconLayout: "default#image",
      iconImageHref: "img/map-marker.png",
      iconImageSize: [218, 142],
      iconImageOffset: [-39, -139]
    });

  a.geoObjects.add(b),
  a.controls.remove("rulerControl"),
  a.controls.remove("searchControl"),
  a.controls.remove("trafficControl"),
  a.controls.remove("typeSelector"),
  a.controls.remove("zoomControl"),
  a.controls.remove("geolocationControl"),
  a.controls.remove("routeEditor")
});


(function() {  
  var popup = document.querySelector(".feedback-popup");
  var link = document.querySelector("#feedback-button");
  var close = popup.querySelector(".feedback-popup-close");
  var form = popup.querySelector(".feedback-form");
  var username = popup.querySelector("#feedback-username");
  var email = popup.querySelector("#feedback-email");
  var comment = popup.querySelector("#feedback-comment");
  var storage_user = localStorage.getItem("feedback-username");
  var storage_email = localStorage.getItem("feedback-email");

  link.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("feedback-popup-show");
    if (storage_user && storage_email) {
      username.value = storage_user;
      email.value = storage_email;
      comment.focus();
    } else {
      username.focus();
    }
  });

  close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("feedback-popup-show");
    popup.classList.remove("feedback-popup-error");
  });

  form.addEventListener("submit", function(event) {
    if (username.value && email.value ) {
      localStorage.setItem("feedback-username", username.value);
      localStorage.setItem("feedback-email", email.value);
    } else {
      event.preventDefault();
      popup.classList.remove("feedback-popup-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("feedback-popup-error");
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popup.classList.contains("feedback-popup-show")) {
        popup.classList.remove("feedback-popup-show");
        popup.classList.remove("feedback-popup-error");
      }
    }
  });

  window.addEventListener("click", function(event) {
    if (popup.classList.contains("feedback-popup-show")
      && !(parents(event.target).includes(form))
      && event.target !== form
      && event.target !== link) {
      popup.classList.remove("feedback-popup-show");
      popup.classList.remove("feedback-popup-error");
    }
  });

  function parents(node) {
    var current = node,
      list    = [];
    while(current.parentNode != null && current.parentNode != document.documentElement) {
      list.push(current.parentNode);
      current = current.parentNode;
    }
    return list;
  }

}());
