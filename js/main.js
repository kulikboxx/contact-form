'use strict';

const messages = {
    valueLength: 'Enter at least 5 characters!',
    email: 'Enter a valid email!',
    phone: 'Enter a valid phone number!',
    successfull: 'Your message was successfully sent. :)',
    error: 'An error has occurred. Please reload the page and try again.'
}

const showMessage = (field, alert) => {
    field.classList.add('error');
    field.nextElementSibling.innerHTML = alert;
}

const hideMessage = (field) => {
    field.classList.remove('error');
    field.nextElementSibling.innerHTML = '';
}

const showModal = (alert) => {
    const modal = document.querySelector('.modal');

    if (!modal.classList.contains('show-modal')) {
        modal.classList.add('show-modal');
        modal.firstElementChild.textContent = alert;
    } else {
        modal.classList.remove('show-modal');
        modal.firstElementChild.textContent = '';
    }
}

document.querySelector('#phone').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

const emailValidation = (email) => {
    let result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return result.test(String(email).toLowerCase());
}

const checkInputs = (selector) => {
    let inputs = document.querySelectorAll(selector),
        count = 0;

    inputs.forEach(input => {
        if (input.getAttribute('id') === 'name' || input.getAttribute('id') === 'message') {
            input.value.length < 5 ? showMessage(input, messages.valueLength) : hideMessage(input);
        }

        if (input.getAttribute('id') === 'email') {
            !emailValidation(input.value) ? showMessage(input, messages.email) : hideMessage(input);
        }

        if (input.getAttribute('id') === 'phone') {
            input.value.length < 9 ? showMessage(input, messages.phone) : hideMessage(input);
        }

        if (input.type === 'checkbox') {
            !input.checked ? input.classList.add('error') : input.classList.remove('error');
        }
    });

    inputs.forEach(item => {
        if (item.classList.contains('error')) count++;
    });

    if (count === 0) formSend();
}

let result;

async function formSend() {
    const form = document.querySelector('#form');

    let formData = new FormData(form);
    let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        result = await response.json();
        showModal(messages.successfull);
        form.reset();
    } else {
        showModal(messages.error);
    }
}

document.querySelector('#form .form-btn').addEventListener('click', e => {
    e.preventDefault();
    checkInputs('.form-input');
});

document.querySelector('.close').addEventListener('click', showModal);