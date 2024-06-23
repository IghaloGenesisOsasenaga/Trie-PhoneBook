import { insertNewContact } from "./main.js";

var contacts_api = "https://lecture-notes-uniben.000webhostapp.com/api/contacts_repo.php";

function main() {
    document.getElementById('new_contact_form').addEventListener('submit', function(event) {
        event.preventDefault();

        const contactName = document.getElementById('contact_name').value.trim();
        const phoneNumber = document.getElementById('phone_number').value.trim();

        if (contactName && phoneNumber) {
            const newContact = {
                name: contactName,
                number: phoneNumber,
            };

            $.post(contacts_api, { "0x85567": newContact }, function(data) {/*console.log(data);*/});
            
            insertNewContact(newContact);

            document.getElementById('contact_name').value = '';
            document.getElementById('phone_number').value = '';
            window.location.href = `${window.location.origin}/index.html`;
        } else {
            alert("Please fill out both fields.");
        }
    });
}

window.onload = main;
