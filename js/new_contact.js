import { insertNewContact } from "./main.js";

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

            insertNewContact(newContact);

            document.getElementById('contact_name').value = '';
            document.getElementById('phone_number').value = '';
            window.location.href = `${window.location.origin}/Trie-PhoneBook/index.html`;
        } else {
            alert("Please fill out both fields.");
        }
    });
}

window.onload = main;
