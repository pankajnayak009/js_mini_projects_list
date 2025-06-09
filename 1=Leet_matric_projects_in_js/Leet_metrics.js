document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-cards");

  // Username validation
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid username");
    }
    return isMatching;
  }

  // Fetch user data from API
  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch details");
      }
      const parsedData = await response.json();
      console.log("Logging data:", parsedData);

      // Display on UI
      displayUserData(parsedData);
      displayCardStats(parsedData);
    } catch (error) {
      statsContainer.innerHTML = `<p>No data found</p>`;
      console.error(error.message);
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  // Update circular progress
  function updateProgress(solved, total, label, circle) {
    const progressPercent = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressPercent}%`);
    label.textContent = `${solved}/${total}`;
  }

  // Display user data in progress circles
  function displayUserData(parsedData) {
    updateProgress(
      parsedData.easySolved,
      parsedData.totalEasy,
      easyLabel,
      easyProgressCircle
    );
    updateProgress(
      parsedData.mediumSolved,
      parsedData.totalMedium,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(
      parsedData.hardSolved,
      parsedData.totalHard,
      hardLabel,
      hardProgressCircle
    );
  }

  // Display user data in card stats
  function displayCardStats(data) {
    cardStatsContainer.innerHTML = ""; // Clear previous stats

    const cards = [
      {
        title: "Total Solved",
        value: data.totalSolved ?? "N/A",
      },
      {
        title: "Acceptance Rate",
        value: data.accuracy ? `${data.accuracy}%` : "N/A",
      },
      {
        title: "Ranking",
        value: data.ranking ? `#${data.ranking}` : "N/A",
      },
      {
        title: "Contribution Points",
        value: data.contributionPoints ?? "N/A",
      },
      {
        title: "Total Submissions",
        value: data.totalSubmission ?? "N/A",
      },
    ];

    cards.forEach(({ title, value }) => {
      const card = document.createElement("div");
      card.classList.add("stat-card");
      card.innerHTML = `<h3>${title}</h3><p>${value}</p>`;
      cardStatsContainer.appendChild(card);
    });
  }

  // Search button with click event
  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    console.log("Logging username:", username);
    if (validateUsername(username)) {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;
      fetchUserDetails(username);
    }
  });
});
