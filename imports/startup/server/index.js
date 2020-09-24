// Import server startup through a single index entry point
process.env.MAIL_URL = "smtps://app%app.com:app@smtp.gmail.com:465";

import './reset-password-email.js';
import './fixtures.js';
import './register-api.js';
import './rest.js';