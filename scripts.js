let currentImageId = null
let imageIds = []
let modalImageNode = document.querySelector('[data-modal-image]')

function closeModal() {
  modalImageNode.innerHTML = ''
  document.body.classList.remove('show-modal')
}

document.querySelector('[data-modal-close]').addEventListener('click', closeModal)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})

function setModalImage(imageId) {
  const img = document.querySelector(`[data-image-id="${imageId}"]`)
  document.body.classList.add('show-modal')
  currentImageId = imageId

  modalImageNode.style.backgroundImage = `url(/images/gallery/full/${imageId}.jpg)`
}

Array.from(document.querySelectorAll("[data-image-id]")).forEach((img) => {
  const { imageId } = img.dataset;
  imageIds.push(imageId)

  img.addEventListener("click", () => {
    setModalImage(imageId)
  });
});


Array.from(document.querySelectorAll("[data-gallery-nav]")).forEach((img) => {
  img.addEventListener("click", () => {
    const { galleryNav } = img.dataset;
    let nextImage
    
    if (galleryNav === 'next') {
      nextImage = imageIds[imageIds.indexOf(currentImageId) + 1] || '1'
      // get indexOf +1
      // if undefined, show on index 0
    } else {
      nextImage = imageIds[imageIds.indexOf(currentImageId) - 1] || '5'
    }

    console.log(nextImage)
    setModalImage(nextImage)
  });
});
