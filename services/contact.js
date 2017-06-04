/**
 * Created by Sergei on 04.06.2017.
 */

module.exports = (contact) => {
    function Contact(contact) {
        this.getContacts = getContacts;
        this.addContact = addContact;
        this.deleteContact = deleteContact;

        function getContacts(options) {
            let params = {};
            if (options != undefined && options.offset !=undefined && options.limit != undefined)
                params = {offset: options.offset, limit: options.limit};
            return new Promise((resolve, reject) => {
                contact.findAll(params).then(resolve).catch(reject);
            })
        }

        function addContact(object) {
            return new Promise((resolve, reject) => {
                contact.create(object).then(resolve).catch(reject);
            })
        }

        function deleteContact(options) {
            return new Promise((resolve, reject) => {
                contact.destroy({ where: {
                    id: options.id
                }}).then(resolve).catch(reject);
            })
        }
    }

    return new Contact(contact);
};