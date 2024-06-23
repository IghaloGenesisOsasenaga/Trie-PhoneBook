// This function sets the data to the HTML elemnts that are gonna display it.
function loadContact() {
    const name = document.getElementById('name');
    const number = document.getElementById('number');
    const msg_no = document.getElementById('msg_no');
    const vid_call_no = document.getElementById('vid_call_no');
    const contact_data = JSON.parse(localStorage.currentContact);

    name.textContent = contact_data.name;
    number.textContent = contact_data.number;
    msg_no.textContent = contact_data.number;
    vid_call_no.textContent = contact_data.number;
}

window.onload = loadContact;