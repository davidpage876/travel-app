// Build environment.
const buildEnv = process.env.NODE_ENV;

// Scripts.
import { hello } from './js/hello';

// Styles.
import './styles/main.scss';

hello();

export { buildEnv }