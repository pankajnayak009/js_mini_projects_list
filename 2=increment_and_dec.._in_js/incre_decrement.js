const decreasebtn = document.getElementById("decre_btn");
const increasebtn = document.getElementById("Incre_btn");
const countDisplay = document.getElementById("count");
const resetBtn = document.getElementById("reset_btn");

let count = 0;

//increment_button
increasebtn.addEventListener("click", function () {
  count++;
  countDisplay.textContent = count;
});

//decrement_button
decreasebtn.addEventListener("click", function () {
  count--;
  countDisplay.textContent = count;
});

//reset button
resetBtn.addEventListener("click", function () {
  count = 0;
  countDisplay.textContent = count;
});
