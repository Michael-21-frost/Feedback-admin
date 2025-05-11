// feedbackService.js - using IIFE pattern to avoid polluting global scope
(function() {
    const API_BASE_URL = 'https://conventtravelagency.com.ng/ttg';
    
    window.FeedbackService = {
        async getAllFeedbacks() {
            try {
                const response = await fetch(`${API_BASE_URL}/feedbacks`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
              console.log("Raw API response:", data);
                return Array.isArray(data.data) ? data.data : [];

                
                // Ensure we always return an array
                return Array.isArray(data) ? data : [];
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                return []; // Return empty array on error
            }
        },

        async updateFeedbackStatus(id, status) {
            try {
                const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Error updating feedback:', error);
                throw error;
            }
        }
    };
})();