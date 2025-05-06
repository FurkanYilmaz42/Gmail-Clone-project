
import { renderMails, uiElement, updateMail } from "./ui.js";

const mails = JSON.parse(localStorage.getItem("mails")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderMails(uiElement.mailsArea, mails);
});

uiElement.createBtn.addEventListener("click", () => {
  uiElement.modal.classList.add("open");
});

uiElement.closeBtn.addEventListener("click", () => {
  uiElement.modal.classList.remove("open");
});

uiElement.hamburgerMenu.addEventListener("click", () => {
  uiElement.leftAside.classList.toggle("hide");
});

window.addEventListener("resize", (e) => {

  const screenWidth = e.target.innerWidth;
  if (screenWidth < 1100) {
    uiElement.leftAside.classList.add("hide");
  } else {
    uiElement.leftAside.classList.remove("hide");
  }
});

uiElement.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const receiver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  if (!receiver && !title && !message) {
    Toastify({
      text: "Formu doldurunuz!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #BF3131 , #7D0A0A)",
        borderRadius: "10px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    return;
  }

  const newMail = {
    id: new Date().getTime(),
    receiver,
    title,
    message,
    stared: false,
    date: new Date().toLocaleDateString("tr", {
      day: "2-digit",
      month: "long",
    }),
  };

  mails.unshift(newMail);
  localStorage.setItem("mails", JSON.stringify(mails));
  e.target.reset();

  uiElement.modal.classList.remove("open");

  Toastify({
    text: "Mail gönderildi.",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #67AE6E, #328E6E)",
      borderRadius: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  renderMails(uiElement.mailsArea, mails);
});


uiElement.mailsArea.addEventListener("click", updateMail);
uiElement.navigation.addEventListener("click", (e) => {

  const clickedCategory = e.target.closest("a");
  const links = uiElement.navigation.querySelectorAll("a");
  
  links.forEach((link) => link.classList.remove("active"));
  clickedCategory.classList.add("active");

  const categoryName = clickedCategory.innerText;

  if (categoryName === "Yildizlananlar") {

    const staredMails = mails.filter((mail) => mail.stared === true);

    renderMails(uiElement.mailsArea, staredMails);
  } else {
    renderMails(uiElement.mailsArea, mails);
  }
});

uiElement.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = e.target[1].value;
  const filtredMails = mails.filter((i) =>
    i.receiver.toLowerCase().includes(query.toLowerCase())
  );

  renderMails(uiElement.mailsArea, filtredMails);
});

export { mails };
