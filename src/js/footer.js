import { post } from './api.js';

const form = document.getElementById('subscribe-form');
const emailInput = form?.querySelector('.form_input');

if(form && emailInput)
{
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const email = emailInput.value.trim();
    
        await post('subscription', { email: email })
    });
}