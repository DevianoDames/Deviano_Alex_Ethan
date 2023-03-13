console.log ('js is wired')
const spanElements = document.querySelectorAll('.bubbles span');


spanElements.forEach(span => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  span.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});