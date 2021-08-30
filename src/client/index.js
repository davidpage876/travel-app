// Build environment.
const buildEnv = process.env.NODE_ENV;

// Scripts.
import { hello } from './js/hello';

// Styles.
import './styles/main.scss';

hello();

// Ensure date input cannot be earlier than today.
(() => {
    const inputForm = document.getElementById('input-form');
    const dateInput = inputForm.date;
    dateInput.min = new Date().toISOString().slice(0, 10);
})();

export { buildEnv }