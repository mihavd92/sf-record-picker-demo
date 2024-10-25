public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static Contact getRecord(Id recordId) {
        return [SELECT 
        Id, 
        FirstName, 
        LastName, 
        Email, 
        Phone 
        FROM Contact 
        WHERE Id = :recordId LIMIT 1];
    }
}
