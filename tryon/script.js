document.addEventListener("DOMContentLoaded", () => {
  const jewelleryData = {
    gold: [
      {
        id: "g1",
        name: "Gold Necklace",
        image:
          "https://via.placeholder.com/400/FFD700/000000?text=Gold+Necklace",
      },
      {
        id: "g2",
        name: "Gold Bangle",
        image: "https://via.placeholder.com/400/FFD700/000000?text=Gold+Bangle",
      },
    ],
    silver: [
      {
        id: "s1",
        name: "Silver Earrings",
        image:
          "https://via.placeholder.com/400/C0C0C0/000000?text=Silver+Earrings",
      },
      {
        id: "s2",
        name: "Silver Anklet",
        image:
          "https://via.placeholder.com/400/C0C0C0/000000?text=Silver+Anklet",
      },
    ],
    pearl: [
      {
        id: "p1",
        name: "Pearl Necklace",
        image:
          "https://via.placeholder.com/400/F0EAD6/000000?text=Pearl+Necklace",
      },
      {
        id: "p2",
        name: "Pearl Bracelet",
        image:
          "https://via.placeholder.com/400/F0EAD6/000000?text=Pearl+Bracelet",
      },
    ],
    diamond: [
      {
        id: "d1",
        name: "Diamond Ring",
        image:
          "https://via.placeholder.com/400/B9F2FF/000000?text=Diamond+Ring",
      },
      {
        id: "d2",
        name: "Diamond Pendant",
        image:
          "https://via.placeholder.com/400/B9F2FF/000000?text=Diamond+Pendant",
      },
    ],
    mangalsutra: [
      {
        id: "m1",
        name: "Traditional Mangalsutra",
        image:
          "https://via.placeholder.com/400/000000/FFFFFF?text=Traditional+Mangalsutra",
      },
      {
        id: "m2",
        name: "Modern Mangalsutra",
        image:
          "https://via.placeholder.com/400/000000/FFFFFF?text=Modern+Mangalsutra",
      },
    ],
  };

  const jewelleryTypeSelect = document.getElementById("jewellery-type");
  const itemsGrid = document.getElementById("items-grid");
  const jewelleryViewer = document.getElementById("jewellery-viewer");
  const zoomSlider = document.getElementById("zoom-slider");
  const rotateSlider = document.getElementById("rotate-slider");

  function populateItems(type) {
    itemsGrid.innerHTML = "";
    const items = jewelleryData[type];
    if (items && items.length > 0) {
      items.forEach((item, index) => {
        const thumb = document.createElement("img");
        thumb.src = item.image;
        thumb.alt = item.name;
        thumb.classList.add("item-thumbnail");
        thumb.dataset.imageId = item.id;
        thumb.addEventListener("click", () => {
          jewelleryViewer.src = item.image;
          document
            .querySelectorAll(".item-thumbnail")
            .forEach((t) => t.classList.remove("active"));
          thumb.classList.add("active");
        });
        itemsGrid.appendChild(thumb);

        if (index === 0) {
          jewelleryViewer.src = item.image;
          thumb.classList.add("active");
        }
      });
    }
  }

  jewelleryTypeSelect.addEventListener("change", (e) => {
    populateItems(e.target.value);
  });

  function applyTransform() {
    jewelleryViewer.style.transform = `scale(${zoomSlider.value}) rotate(${rotateSlider.value}deg)`;
  }

  zoomSlider.addEventListener("input", applyTransform);
  rotateSlider.addEventListener("input", applyTransform);

  // Initial population
  populateItems("gold");
});
