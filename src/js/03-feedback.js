import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput() {
  formData = {
    email: `${refs.form.elements.email.value}`,
    message: `${refs.form.elements.message.value}`,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function savedForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData !== null) {
    refs.form.elements.email.value = savedFormData.email;
    refs.form.elements.message.value = savedFormData.message;
  }
}

savedForm();
