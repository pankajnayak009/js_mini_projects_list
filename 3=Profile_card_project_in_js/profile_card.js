// ✅ What is classList in JavaScript?
// classList is a JavaScript property that lets you work with the classes of an HTML element easily.

// Instead of writing long className strings, you can use classList to:

// Task           	                   Method	                                                    Example
// Add a class    	                   element.classList.add()	                              btn.classList.add("active")
// Remove a class	                     element.classList.remove()	                            btn.classList.remove("dark")
// Toggle a class  	                   element.classList.toggle()	                            btn.classList.toggle("open")
// Check if it has a class          	 element.classList.contains()	                          btn.classList.contains("hide")

const shareBtn = document.querySelector(".button");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeModal");

// Show modal on click
shareBtn.addEventListener("click", () => {
  modal.classList.add("active");
  overlay.classList.add("active");
});

// Hide modal on close (X)
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Hide modal if click outside (on overlay)
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
