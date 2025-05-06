import { formatText } from "./helpers.js";
import { mails } from "./main.js";

const uiElement = {
  hamburgerMenu: document.querySelector("#hamburger-menu"),
  modal: document.querySelector(".modal-wrapper"),
  closeBtn: document.querySelector("#close-btn"),
  navigation: document.querySelector(".left-aside-middle"),
  createBtn: document.querySelector(".create"),
  leftAside: document.querySelector(".left-aside"),
  form: document.querySelector("#mail-form"),
  mailsArea: document.querySelector(".mails-area"),
  searchForm: document.querySelector("#search-form"),
};

const renderMails = (outlet, data) => {
  outlet.innerHTML = data
    .map(
      (mail) => ` 
          <div class="mail" data-id="${mail.id}">
            
            <div class="left">
              <input type="checkbox" />
              <i class="bi bi-star${mail.stared ? "-fill" : ""} "></i>
              <span>${mail.receiver}</span>
            </div>

            <div class="center">
              <p class="mail-title">${mail.title}</p>
              <p class="mail-description">${formatText(mail.message, 35)}</p>
            </div>

            <div class="right">
              <p class="mail-date">${mail.date}</p>
              
              <div class="delete">
                <i class="bi bi-trash-fill"></i>
              </div>

            </div>

          </div>`
    )
    .join(" ");
};

const updateMail = (e) => {
    if (e.target.classList.contains("bi-trash-fill")) {

      const res = confirm("Silme islemini onayliyor musunuz?");
      if (res) {
        const mail = e.target.closest(".mail");
        const mailId = +mail.dataset.id;
        const filtredMails = mails.filter((mail) => mail.id != mailId);
       
        localStorage.setItem("mails", JSON.stringify(filtredMails));
        mail.remove();

        Toastify({
          text: "Mail silindi.",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #F7374F, #FF6363)",
            borderRadius: "10px",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
    }
  
    if (
      e.target.classList.contains("bi-star") ||
      e.target.classList.contains("bi-star-fill")
    ) {

      const mail = e.target.closest(".mail");
      const mailId = parseInt(mail.dataset.id);
      const foundedMail = mails.find((i) => i.id == mailId);
      const updatedMail = { ...foundedMail, stared: !foundedMail.stared };
      const index = mails.findIndex((i) => i.id == mailId);
  
      mails[index] = updatedMail;
      localStorage.setItem("mails", JSON.stringify(mails));
      renderMails(uiElement.mailsArea, mails);
    }
  };

  export { uiElement, renderMails, updateMail };