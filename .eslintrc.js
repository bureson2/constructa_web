module.exports = {
    parser: 'babel-eslint', // Používá Babel parser pro podporu moderních JavaScriptových funkcí
    env: {
        browser: true, // Definuje globální proměnné pro prostředí webového prohlížeče
        es6: true, // Umožňuje syntaxi ES6
        node: true, // Definuje globální proměnné pro prostředí Node.js
    },
    plugins: [
        'cypress',
    ],
    globals: {
        "cy": "readonly",
        "Cypress": "readonly"
    },
    rules: {
        // Zde můžete přidat nebo upravit pravidla ESLint podle potřeby
        'no-console': 'warn', // Varuje při použití console.log
        'quotes': ['error', 'single'], // Vyžaduje jednoduché uvozovky
        'semi': ['error', 'always'], // Vyžaduje středníky
    },
};
