function updateTextInput1(val) {
  document.getElementById('inputfim1').value=val; 
  updatePreviewColor();
}

function updateTextInput2(val) {
  document.getElementById('inputfim2').value=val; 
  updatePreviewColor();
}
function updateTextInput3(val) {
  document.getElementById('inputfim3').value=val; 
  updatePreviewColor();
}


const rangeInputs = Array.from(
  document.body.querySelectorAll('input[type="range"]')
);

const divColor = document.querySelector(".color");

const updatePreviewColor = () => {
  const rgbColor = `rgb(${rangeInputs.map(range => range.value).join(",")})`;
  divColor.style.backgroundColor = rgbColor;
};