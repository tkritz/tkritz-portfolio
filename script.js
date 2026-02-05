const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImage");
const closeBtn = document.getElementById("closeModal");


// Cache low-res placeholders
const lowResMap = {};

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


    // show low-res immediately
    modalImg.src = lowResMap[fullSrc] || fullSrc;
    modalImg.style.filter = "blur(4px)";
    modalImg.style.opacity = "0.95";

    // load high-res
    const highRes = new Image();
    highRes.src = fullSrc;
    highRes.onload = () => {
      modalImg.src = fullSrc;
      modalImg.style.filter = "blur(0)";
      modalImg.style.opacity = "1";
    };
  });
});

// Close modal
function closeModal() {
  modal.classList.add("hidden");
  modalImg.src = "";
  modalImg.style.filter = "";
  modalImg.style.opacity = "";
  document.body.classList.remove("modal-open");

}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);




@keyframes rainbow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.profile-ring {
  border-radius: 50%;
  background: linear-gradient(270deg, #f87171, #fbbf24, #34d399, #3b82f6, #a78bfa);
  background-size: 1000% 1000%;
  animation: rainbow 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}
