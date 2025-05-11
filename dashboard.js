document.addEventListener("DOMContentLoaded", initializeDashboard);

async function initializeDashboard() {
    console.log("Initializing dashboard...");

    try {
        const feedbacks = await window.FeedbackService.getAllFeedbacks();
        console.log("Fetched feedbacks:", feedbacks);

        if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
            console.warn("No feedbacks found or data format is incorrect.");
            return;
        }

        updateTotalFeedback(feedbacks.length);
        populateTable(feedbacks);
    } catch (error) {
        console.error("Dashboard initialization failed:", error);
    }
}


function updateTotalFeedback(count) {
    const totalFeedbackEl = document.getElementById("total-feedback");
    if (totalFeedbackEl) {
        totalFeedbackEl.textContent = count;
    }
}

function populateTable(feedbacks) {
    const tableBody = document.getElementById("feedback-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // clear any existing rows

    feedbacks.forEach(feedback => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${feedback.id}</td>
            <td>${feedback.email}</td>
            <td>${feedback.message}</td>
        
        `;

        tableBody.appendChild(row);
    });
}
