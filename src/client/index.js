// Dependencies.
import 'regenerator-runtime/runtime';

// Build environment.
const buildEnv = process.env.NODE_ENV;

// Scripts.
import { hello } from './js/hello';
import { setUp } from './js/app';

// Styles.
import './styles/main.scss';

hello();

// Set up main form.
setUp();

export { buildEnv }