import { LightningElement, track } from 'lwc';
import getRecord from '@salesforce/apex/ContactController.getRecord';

export default class ContactPickerDemo extends LightningElement {
    @track matchingInfo = {
        primaryField: { fieldPath: 'FirstName' },
        additionalFields: [{ fieldPath: 'LastName' }],
    };
    
    @track displayInfo = {
        additionalFields: ['LastName'],
    };
    
    @track filter = {
        criteria: [],
    };

    @track contactList = []; // Список для збереження знайдених контактів
    selectedRecordId;

    handleRecordChange(event) {
        this.selectedRecordId = event.detail.recordId;
        this.getContactDetails();
    }

    getContactDetails() {
        getRecord({ recordId: this.selectedRecordId })
            .then(result => {
                // Додаємо новий контакт у список, якщо його ще немає в масиві
                if (!this.contactList.some(contact => contact.Id === result.Id)) {
                    this.contactList = [...this.contactList, result];
                }
            })
            .catch(error => {
                console.error('Error fetching contact details:', error);
            });
    }

    openContactInNewTab(event) {
        const contactId = event.target.dataset.contactId;
        const contactUrl = `/lightning/r/Contact/${contactId}/view`;
        window.open(contactUrl, '_blank');
    }

    clearContact(event) {
        const contactId = event.target.dataset.contactId;
        // Видаляємо контакт зі списку за його ID
        this.contactList = this.contactList.filter(contact => contact.Id !== contactId);
    }
}
