document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.getElementById("length"); //progress bar length
  const lengthValue = document.getElementById("length-value"); // 12
  const uppercaseCheckbox = document.getElementById("uppercase"); //checkbox_with_label
  const lowercaseCheckbox = document.getElementById("lowercase"); //checkbox_with_label
  const numbersCheckbox = document.getElementById("numbers"); //checkbox_with_label
  const symbolsCheckbox = document.getElementById("symbols"); //checkbox_with_label
  const generateBtn = document.getElementById("generate");
  const copyBtn = document.getElementById("copy-btn");
  const passwordInput = document.getElementById("placeholder");
  const strengthCircle = document.querySelector(".circle_div");
  const resetbtn = document.querySelector(".reset");

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

  // Update password length display

  lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
  });

  //generat password button function
  generateBtn.addEventListener("click", () => {
    let characters = "";
    if (uppercaseCheckbox.checked) characters += upperChars;
    if (lowercaseCheckbox.checked) characters += lowerChars;
    if (numbersCheckbox.checked) characters += numberChars;
    if (symbolsCheckbox.checked) characters += symbolChars;

    if (characters === "") {
      alert("Please select at least one character type.");
      return;
    }

    //random_password_gererate logic

    let password = " ";
    for (let i = 0; i < lengthInput.value; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    passwordInput.value = password;
    updateStrength(password);
  });

  // Strength logic
  function updateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      strengthCircle.style.backgroundColor = "#e74c3c"; // red
    } else if (strength <= 4) {
      strengthCircle.style.backgroundColor = "#f1c40f"; // yellow
    } else {
      strengthCircle.style.backgroundColor = "#2ecc71"; // green
    }
  }

  // Copy to clipboard
  copyBtn.addEventListener("click", () => {
    const password = passwordInput.value.trim(); // Remove whitespace

    // ✅ If empty, show proper message and stop
    if (!password) {
      alert("❗ Please generate a password first!");
      return;
    }

    // Copy to clipboard and show success
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert(" Your password has been copied successfully!");

        //  Show check icon temporarily
        copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

        setTimeout(() => {
          copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
        }, 1000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        alert("Failed to copy the password.");
      });
  });

  //deafault values set
  function setDefaultState() {
    passwordInput.value = "";
    lengthInput.value = 8;
    lengthValue.textContent = 8;

    // Set checkbox states
    uppercaseCheckbox.checked = false;
    lowercaseCheckbox.checked = false;
    numbersCheckbox.checked = false;
    symbolsCheckbox.checked = false;

    // Reset strength color
    strengthCircle.style.backgroundColor = "#ccc";

    // Reset copy icon
    copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
  }
  setDefaultState();

  // resetbtn
  //with the help of default reset function  i can create my ownn reset
  // btn for achiving this atate for simply call the this value insto your reset btn
  resetbtn.addEventListener("click", setDefaultState);
});
