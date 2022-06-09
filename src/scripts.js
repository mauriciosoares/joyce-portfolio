let currentImageId = null;
let imageIds = [];
let modalIsOpen = false;

let modalImageNode = document.querySelector("[data-modal-image]");

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
  history.pushState(null, null, `#${imageId}`);
  const img = document.querySelector(`[data-image-id="${imageId}"]`);
  document.body.classList.add("show-modal");
  modalIsOpen = true;
  currentImageId = imageId;

  const imageUrl = new URL(
    `/images/gallery/full/${imageId}.jpg`,
    import.meta.url
  ).href;

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
