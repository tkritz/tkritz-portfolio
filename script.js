const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImage");
const closeBtn = document.getElementById("closeModal");

const lowResMap = {};
const mobileBlock = document.getElementById("mobileBlock");

function updateMobileBlock() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    mobileBlock.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    mobileBlock.style.pointerEvents = "auto";
  } else {
    mobileBlock.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.pointerEvents = "";
  }
}

// Run on page load
updateMobileBlock();

// Recheck on resize
window.addEventListener("resize", updateMobileBlock);



// Pre-generate low-res placeholders
document.querySelectorAll(".ui-thumb").forEach(img => {
  const src = img.dataset.full;
  const temp = new Image();
  temp.src = src;

  temp.onload = () => {
    const canvas = document.createElement("canvas");
    const maxWidth = window.innerWidth * 0.9;
    const scale = Math.min(1, maxWidth / temp.width);

    canvas.width = temp.width * scale;
    canvas.height = temp.height * scale;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);

    lowResMap[src] = canvas.toDataURL();
  };
});

// Open modal
document.querySelectorAll(".ui-thumb").forEach(img => {
  img.addEventListener("click", () => {
    const fullSrc = img.dataset.full;

    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");

    modalImg.src = lowResMap[fullSrc] || fullSrc;
    modalImg.style.filter = "blur(4px)";
    modalImg.style.opacity = "0.95";

    const highRes = new Image();
    highRes.src = fullSrc;
    highRes.onload = () => {
      modalImg.src = fullSrc;
      modalImg.style.filter = "blur(0)";
      modalImg.style.opacity = "1";
    };
  });
});

// Close logic (SAFE)
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.add("hidden");
  modalImg.src = "";
  modalImg.style.filter = "";
  modalImg.style.opacity = "";
  document.body.classList.remove("modal-open");
}
