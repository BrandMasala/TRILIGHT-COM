/**
 * CRM Submission Module
 * Handles sending lead data to the backend CRM.
 */

class CRMService {
    constructor() {
        this.endpoint = 'CRM/submit.php'; 
    }

    /**
     * Submit lead data to the CRM
     * @param {FormData} formData - The formData object from the submitting form
     * @returns {Promise<any>}
     */
    async submitLead(formData) {
        try {
            // Convert FormData to plain object 
            const data = Object.fromEntries(formData.entries());
            
            // Map frontend form data fields to the GET parameters expected by CRM/submit.php
            const queryParams = new URLSearchParams({
                customer_name: data.name || '',
                email: data.email || '',
                mobile_number: data.phone || '',
                countrycode: '91',
                project_id: '1'
            }).toString();
            
            // Execute the GET request to the local PHP proxy file
            const response = await fetch(`${this.endpoint}?${queryParams}`, {
                method: 'GET',
                // Setting redirect to manual or follow depends on the PHP redirect behavior.
                // fetch will automatically follow the header('Location: ...') in submit.php.
                redirect: 'follow' 
            });

            // If we've successfully hit the endpoint, it will process and potentially redirect.
            return { success: true };
            
        } catch (error) {
            console.error('CRM Submission Error:', error);
            throw error;
        }
    }
}

// Export as a global instance so we can use it across the site
window.crmService = new CRMService();
