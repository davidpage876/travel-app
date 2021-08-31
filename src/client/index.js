// Build environment.
const buildEnv = process.env.NODE_ENV;

// Scripts.
import { hello } from './js/hello';
import { setUp } from './js/form';

// Styles.
import './styles/main.scss';

hello();

// Set up main form.
setUp();

export { buildEnv }