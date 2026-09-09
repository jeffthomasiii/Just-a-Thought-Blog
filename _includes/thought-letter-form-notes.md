<!-- This file is intentionally omitted from the built site by Jekyll because it lives in _includes. -->

The Thought Letter subscription form is supplied by Brevo and rendered through `_includes/thought-letter-form.html`.

The home page enables the integration with `thought_letter_form: true` in `index.html`. That flag conditionally loads Brevo's stylesheet in `_includes/head.html` and the Brevo/reCAPTCHA scripts through `_includes/thought-letter-scripts.html` from the default layout.

Brand overrides live in `_sass/thought-letter.scss` and keep the provider markup aligned with the Just A Thought design system, including dark mode.
