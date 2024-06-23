import {Trie, TrieNode} from './Trie.js';

var contacts_api = "https://lecture-notes-uniben.000webhostapp.com/api/contacts_repo.php";
$.post(contacts_api, { "0x36552": "opensaysme" }, function(data) {localStorage.contacts=data;});
/**
contact structure
{
    contacts: [
        {
            name
            number
        },
        {
            name
            number
        },
        {
            name
            number
        }
    ]
} 

*/

const trie = new Trie();
//'{"contacts":[]}'
const default_contacts = `{"contacts":[{"name":"Akiles","number":"+11 (454) 888-1111"},{"name":"JamesBond","number":"+1 (000) 555-2222"}]}`;
const localContacts = localStorage.getItem('contacts') || default_contacts;

let storedContacts;
try {
    storedContacts = JSON.parse(localContacts);
} catch (error) {
    console.error('Failed to parse contacts from localStorage:', error);
    storedContacts = { "contacts": [] };
}
const contactIDlookup = []; // For accessing contacts wtih a unique ID
let currentID = 0;
const contactList = document.getElementById('contact_list');

function viewContact(e) {
    localStorage.currentContact = JSON.stringify(fetchContact(e.target.id));
    window.location.href = `${window.location.origin}/view_contact.html`;
};


// This function when called stores the JSON object, used for the entire contact data, in localStorage.
function storeContacts() {
    localStorage.setItem('contacts', JSON.stringify(storedContacts));
}


// This function gets all ids related to the search prefix from the Trie and give the ids to the updateContactList.
function searchContacts(searchPrefix) {
    const query = searchPrefix.toLowerCase();
    const foundIDs = trie.search(query);
    if (query == '') resetContactList();
    else updateContactList(foundIDs);
}


// This function clears the contact list and appends all contacts associated with the IDlist it was given.
function updateContactList(IDlist) {
    contactList.innerHTML = '';

    if (IDlist.length === 0) {
        contactList.innerHTML = "<li class='empty-list'>No Contacts Found</li>";
    } else {
        IDlist.forEach(id => {
            let listItem = document.createElement('li');
            listItem.id = id;
            listItem.className = 'contact';
            listItem.textContent = contactIDlookup[id].name;
            listItem.addEventListener('click', viewContact);

            contactList.appendChild(listItem);
        });
    }
}


// This function clears the contact list and append all available contacts on localstorage.
export function resetContactList(){
    contactList.innerHTML = '';
    if (contactIDlookup.length == 0) return;

    let currentChar = contactIDlookup[0].name[0].toUpperCase();
    contactList.innerHTML += `<li id="${currentChar}" class="contact-class">${currentChar}</li>`;

    for (let id = 0; id < currentID; ++id){
        let newChar = contactIDlookup[id].name[0].toUpperCase();
        if (currentChar != newChar){
            contactList.innerHTML += `<li id="${newChar}" class="contact-class">${newChar}</li>`;
            currentChar = newChar;
        }
        contactList.innerHTML += `<li id="${id}" class="contact">${contactIDlookup[id].name}</li>`;
    }

    document.querySelectorAll('.contact').forEach(item => {
        item.addEventListener('click', viewContact);
    })
}


//This function inserts new contact in the JSON object so that it remains sorted alphabetically by names.
export function insertNewContact(contact) {
    const contactName = contact.name;

    let position = storedContacts.contacts.findIndex(existingContact => {
        const existingContactName = existingContact.name.toLowerCase();
        return contactName.localeCompare(existingContactName) < 0;
    });
    
    if (position === -1) {
        storedContacts.contacts.push(contact);
    } else {
        storedContacts.contacts.splice(position, 0, contact);
    }

    storeContacts();
}


// This function returns the contact object associated with an id.
function fetchContact(id) {
    return contactIDlookup[id];
}


// This is the main funtion where all necessary funtion calls, that need to be done on page reload, are done.
function main() {
    for (let contact of storedContacts.contacts) {
        trie.insert(contact.name.toLowerCase(), currentID);
        contactIDlookup[currentID] = contact;
        currentID += 1;
    }
    resetContactList();

    document.getElementById('search_box').addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        if (searchTerm != '') {
            searchContacts(searchTerm);
        } else {
            resetContactList();
        }
    });
    
    document.getElementById('create_new_contact').addEventListener('click', function (e) {
        window.location.href = `${window.location.origin}/new_contact.html`;
    });
}


window.onload = main;
