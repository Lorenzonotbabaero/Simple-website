/* =========================================
   EMAILJS
========================================= */

emailjs.init({
  publicKey: "yWCbXVy9EpRv6Dt_c"
});


/* =========================================
   BACKGROUND MUSIC
========================================= */

const music =
  document.getElementById("background-music");

music.volume = 0.35;


function startMusic() {

  music.play().catch(function () {

    console.log(
      "Autoplay was blocked by the browser."
    );

  });

}


window.addEventListener(
  "load",
  startMusic
);


/*
  If the browser blocks autoplay,
  start music after the first user interaction.
*/

function startMusicAfterInteraction() {

  if (music.paused) {

    music.play().catch(function () {});

  }

}


document.addEventListener(
  "click",
  startMusicAfterInteraction,
  { once: true }
);

document.addEventListener(
  "touchstart",
  startMusicAfterInteraction,
  { once: true }
);

document.addEventListener(
  "keydown",
  startMusicAfterInteraction,
  { once: true }
);


/* =========================================
   THREE DOT MENU
========================================= */

const menuButton =
  document.getElementById("menu-button");

const sideMenu =
  document.getElementById("side-menu");

const menuClose =
  document.getElementById("menu-close");

const menuBackdrop =
  document.getElementById("menu-backdrop");


function openMenu() {

  sideMenu.classList.add("active");

  sideMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

}


function closeMenu() {

  sideMenu.classList.remove("active");

  sideMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

}


menuButton.addEventListener(
  "click",
  openMenu
);

menuClose.addEventListener(
  "click",
  closeMenu
);

menuBackdrop.addEventListener(
  "click",
  closeMenu
);


/* =========================================
   ABOUT / SOCIAL MODALS
========================================= */

const aboutModal =
  document.getElementById("about-modal");

const socialModal =
  document.getElementById("social-modal");


const menuLinks =
  document.querySelectorAll(".menu-link");


function openInfoModal(modal) {

  closeMenu();

  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeInfoModal(modal) {

  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


menuLinks.forEach(function (link) {

  link.addEventListener(
    "click",
    function () {

      const section =
        link.dataset.section;


      if (section === "home") {

        closeMenu();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }


      if (section === "about") {

        openInfoModal(
          aboutModal
        );

      }


      if (section === "social") {

        openInfoModal(
          socialModal
        );

      }

    }
  );

});


document
  .querySelectorAll("[data-close-info]")
  .forEach(function (element) {

    element.addEventListener(
      "click",
      function () {

        closeInfoModal(
          aboutModal
        );

        closeInfoModal(
          socialModal
        );

      }
    );

  });


/* =========================================
   SEND MESSAGE
========================================= */

const openMessage =
  document.getElementById(
    "open-message"
  );

const closeMessage =
  document.getElementById(
    "close-message"
  );

const messageModal =
  document.getElementById(
    "message-modal"
  );

const modalBackdrop =
  document.getElementById(
    "modal-backdrop"
  );


function openMessageModal() {

  messageModal.classList.add(
    "active"
  );

  messageModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeMessageModal() {

  messageModal.classList.remove(
    "active"
  );

  messageModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


openMessage.addEventListener(
  "click",
  openMessageModal
);

closeMessage.addEventListener(
  "click",
  closeMessageModal
);

modalBackdrop.addEventListener(
  "click",
  closeMessageModal
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {

      closeMenu();

      closeInfoModal(
        aboutModal
      );

      closeInfoModal(
        socialModal
      );

      closeMessageModal();

    }

  }
);


/* =========================================
   EMAILJS CONTACT FORM
========================================= */

const form =
  document.getElementById(
    "contact-form"
  );

const button =
  document.getElementById(
    "send-button"
  );

const sendText =
  document.getElementById(
    "send-text"
  );

const sendIcon =
  document.getElementById(
    "send-icon"
  );

const status =
  document.getElementById(
    "form-status"
  );


form.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    button.disabled = true;

    sendText.textContent =
      "Sending...";

    sendIcon.textContent =
      "⏳";

    status.textContent =
      "";

    status.className =
      "form-status";


    emailjs.sendForm(
      "service_mdvmj8k",
      "template_1fz2w1p",
      form
    )


    .then(function (response) {

      console.log(
        "EmailJS Success:",
        response.status,
        response.text
      );


      status.textContent =
        "✓ Message sent successfully!";

      status.className =
        "form-status success";


      form.reset();


      sendText.textContent =
        "Message Sent";

      sendIcon.textContent =
        "✓";


      setTimeout(
        function () {

          closeMessageModal();


          sendText.textContent =
            "Send Message";

          sendIcon.textContent =
            "➤";

          button.disabled =
            false;

          status.textContent =
            "";

        },
        2000
      );

    })


    .catch(function (error) {

      console.error(
        "EmailJS Error:",
        error
      );


      status.textContent =
        "✕ Failed to send. Please try again.";

      status.className =
        "form-status error";


      sendText.textContent =
        "Try Again";

      sendIcon.textContent =
        "↻";


      button.disabled =
        false;

    });

  }
);
