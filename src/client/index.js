// Dependencies.
import 'regenerator-runtime/runtime';

// Build environment.
const buildEnv = process.env.NODE_ENV;

// Scripts.
import { setUp } from './js/app';

// Styles.
import './styles/main.scss';

// Set up main form.
setUp();

export { buildEnv }