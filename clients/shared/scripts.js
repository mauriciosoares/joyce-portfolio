let currentImageId = null;
let imageIds = [];
let modalIsOpen = false;

let modalImageNode = document.querySelector("[data-modal-image]");
let modalCheckboxNode = document.querySelector(
  ".modal-container .select-photo"
);
const submitButton = document.querySelector("[data-submit-images]");

function closeModal() {
  modalImageNode.innerHTML = "";
  document.body.classList.remove("show-modal");
  modalIsOpen = false;
  history.pushState(null, null, " ");
}

document
  .querySelector("[data-modal-close]")
  .addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();

  if (e.key === "ArrowRight" && modalIsOpen)
    document.querySelector('[data-gallery-nav="next"]').click();
  if (e.key === "ArrowLeft" && modalIsOpen)
    document.querySelector('[data-gallery-nav="prev"]').click();
});

function setModalImage(imageId) {
  if (imageIds.indexOf(imageId) === -1) {
    return closeModal();
  }
  history.pushState(null, null, `#${imageId}`);
  document.body.classList.add("show-modal");
  modalIsOpen = true;
  currentImageId = imageId;

  const imageUrl = new URL(
    `/images/gallery/full/${imageId}.jpg`,
    import.meta.url
  ).href;

  modalCheckboxNode.setAttribute("value", imageId);
  updateCheckboxes();

  modalImageNode.style.backgroundImage = `url(${imageUrl})`;
}

Array.from(document.querySelectorAll("[data-image-id]")).forEach((img) => {
  const { imageId } = img.dataset;
  imageIds.push(imageId);

  img.addEventListener("click", () => {
    setModalImage(imageId);
  });
});

Array.from(document.querySelectorAll("[data-gallery-nav]")).forEach((img) => {
  img.addEventListener("click", () => {
    const { galleryNav } = img.dataset;
    let nextImage;

    if (galleryNav === "next") {
      nextImage = imageIds[imageIds.indexOf(currentImageId) + 1] || imageIds[0];
      // get indexOf +1
      // if undefined, show on index 0
    } else {
      nextImage =
        imageIds[imageIds.indexOf(currentImageId) - 1] ||
        imageIds[imageIds.length - 1];
    }

    setModalImage(nextImage);
  });
});

document.addEventListener("readystatechange", () => {
  if (window.location.hash) {
    setModalImage(window.location.hash.replace("#", ""));
  }
});

const selectedImagesCountElement = document.querySelector(
  "#selected-images-count"
);

let selectedImages = JSON.parse(localStorage.getItem("selected-images")) || [];

function updateCheckboxes() {
  document
    .querySelectorAll(`.select-photo`)
    .forEach((node) => (node.checked = false));
  selectedImages = JSON.parse(localStorage.getItem("selected-images")) || [];
  if (selectedImages.length > 0) {
    selectedImages.forEach((imageId) => {
      document
        .querySelectorAll(`.select-photo[value="${imageId}"]`)
        .forEach((node) => (node.checked = true));
    });

    selectedImagesCountElement.textContent = selectedImages.length;
  }
}

updateCheckboxes();

document.querySelectorAll(".select-photo").forEach((element) => {
  element.addEventListener("change", function () {
    let s = parseInt(selectedImagesCountElement.textContent);
    if (this.checked) {
      selectedImages.push(this.value);
    } else {
      selectedImages = selectedImages.filter((id) => id !== this.value);
    }

    localStorage.setItem("selected-images", JSON.stringify(selectedImages));

    selectedImagesCountElement.textContent = selectedImages.length;
    updateCheckboxes();

    checkSubmitButton();
  });
});

function checkSubmitButton() {
  selectedImages = JSON.parse(localStorage.getItem("selected-images")) || [];
  if (selectedImages.length >= window.imageLimit) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
checkSubmitButton();

submitButton.addEventListener("click", () => {
  selectedImages = JSON.parse(localStorage.getItem("selected-images")) || [];

  const message = `Olá Joyce tudo bem?%0a
  %0a
Essas foram as fotos que eu escolhi:%0a
%0a
${selectedImages.map((id) => `${id}%0a`).join("")}`;

  window.open(
    `https://api.whatsapp.com/send?phone=5511932244663&text=${message}`,
    "_blank"
  );
});
