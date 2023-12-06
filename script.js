// get access to filters input

let saturat = document.getElementById("saturat");

let contrast = document.getElementById("contrast");

let brightness = document.getElementById("brightness");

let sepia = document.getElementById("sepia");

let grayscale = document.getElementById("grayscale");

let hue_rotate = document.getElementById("hue-rotate");

let blur = document.getElementById("blur");

// Access btns

let download = document.getElementById("download");

let reset = document.querySelector("span");

let upload = document.getElementById("upload");

// access img

let img = document.getElementById("img");

let imgBox = document.querySelector(".img-box");

// access canvas to draw img

let canvas = document.getElementById("canvas");

let ctxt = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = function () {
  // adding reset function to reset values of img
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";

  //   read img with filereader object

  let file = new FileReader();

  // note: input type:file treated as array

  file.readAsDataURL(upload.files[0]);

  file.onload = function () {
    img.src = file.result;
  };
  // draw img in canvas
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    // note: drawImage(img, x,y , width , height)
    ctxt.drawImage(img, 0, 0, canvas.width, canvas.height);

    img.style.display = "none";
    // hide img as canvas appeared and not need to it
  };
};

// adding filters to img

let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    // hide img when updates after reset and view canvas

    img.style.display = "none";
    canvas.style.display = "block";

    ctxt.filter = `
        saturate(${saturat.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hue_rotate.value}deg)
        `;
    // draw new img with filter
    ctxt.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

// reset img when adding new pic

function resetValue() {
  img.style.filter = "none";
  //   reset values of filters to defualt values
  saturat.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hue_rotate.value = "0";

  // clear the canvas and redraw the original image
  ctxt.clearRect(0, 0, canvas.width, canvas.height);
  ctxt.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// adding reset function to reset btn

reset.addEventListener("click", resetValue);

reset.addEventListener("click", resetimg);

function resetimg() {
  // hide canvas when click on reset btn and view img
  img.style.display = "block";
  canvas.style.display = "none";
}
// downloading img with download btn

download.addEventListener("click", downloadImg);

function downloadImg() {
  download.href = canvas.toDataURL();
}
