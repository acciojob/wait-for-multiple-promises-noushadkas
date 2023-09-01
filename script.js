// Function to generate a random time between min and max seconds
function getRandomTime(min, max) {
  return Math.random() * (max - min) * 1000 + min * 1000;
}

// Create three promises that resolve after a random time between 1 and 3 seconds
const promises = [
  new Promise((resolve) => {
    setTimeout(() => resolve("Promise 1"), getRandomTime(1, 3));
  }),
  new Promise((resolve) => {
    setTimeout(() => resolve("Promise 2"), getRandomTime(1, 3));
  }),
  new Promise((resolve) => {
    setTimeout(() => resolve("Promise 3"), getRandomTime(1, 3));
  }),
];

// Select the table body element to populate rows
const tableBody = document.querySelector("tbody");

// Create a loading row
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
tableBody.appendChild(loadingRow);

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    tableBody.removeChild(loadingRow);

    // Create rows for each resolved promise
    results.forEach((result, index) => {
      const newRow = document.createElement("tr");
      const promiseCell = document.createElement("td");
      const timeCell = document.createElement("td");

      promiseCell.textContent = `Promise ${index + 1}`;
      timeCell.textContent = (Date.now() - startTime) / 1000; // Calculate the time taken in seconds

      newRow.appendChild(promiseCell);
      newRow.appendChild(timeCell);
      tableBody.appendChild(newRow);
    });

    // Calculate the total time taken
    const totalTime = (Date.now() - startTime) / 1000;
    const totalRow = document.createElement("tr");
    const totalCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");

    totalCell.textContent = "Total";
    totalTimeCell.textContent = totalTime.toFixed(3); // Format the total time with 3 decimal places

    totalRow.appendChild(totalCell);
    totalRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

// Record the start time to calculate the total time taken
const startTime = Date.now();
