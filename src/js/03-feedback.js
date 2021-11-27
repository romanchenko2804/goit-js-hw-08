import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input[type="email"]'),
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';
const formData = {};



function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();  
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function savedForm() {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedFormData = JSON.parse(savedFormData);

     if (parsedFormData && parsedFormData.email) {
      refs.input.value = parsedFormData.email;    
    };

    if (parsedFormData && parsedFormData.message) {
        refs.textarea.value = parsedFormData.message;
    };
}
savedForm();