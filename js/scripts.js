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
  var popup = document.querySelector(".feedback-popup"),
      link = document.querySelector("#feedback-button"),
      close = popup.querySelector(".feedback-popup-close"),
      form = popup.querySelector(".feedback-form"),
      username = popup.querySelector("#feedback-username"),
      email = popup.querySelector("#feedback-email"),
      comment = popup.querySelector("#feedback-comment"),
      storage_user = localStorage.getItem("feedback-username"),
      storage_email = localStorage.getItem("feedback-email");

  window.onload = function() {
    comment.setAttribute('value', "");
  }

  link.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("feedback-popup-show");
    form.classList.add("feedback-popup-bounce");
    if (storage_user && storage_email) {
      username.setAttribute('value', storage_user);
      email.setAttribute('value', storage_email);
      comment.focus();
    } else {
      username.focus();
    }
  });

  close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("feedback-popup-show");
    form.classList.remove("feedback-popup-bounce");
    form.classList.remove("feedback-popup-error");
  });

  form.addEventListener("submit", function(event) {
    if (username.value && email.value ) {
      localStorage.setItem("feedback-username", username.value);
      localStorage.setItem("feedback-email", email.value);
    } else {
      event.preventDefault();
      form.classList.remove("feedback-popup-error");
      form.offsetWidth = form.offsetWidth;
      form.classList.add("feedback-popup-error");
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popup.classList.contains("feedback-popup-show")) {
        popup.classList.remove("feedback-popup-show");
        form.classList.remove("feedback-popup-bounce");
        form.classList.remove("feedback-popup-error");
      }
    }
  });

  window.addEventListener("click", function(event) {
    if (popup.classList.contains("feedback-popup-show")
      && !(parents(event.target).includes(form))
      && event.target !== form
      && event.target !== link) {
      popup.classList.remove("feedback-popup-show");
      form.classList.remove("feedback-popup-bounce");
      form.classList.remove("feedback-popup-error");
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
