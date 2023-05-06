module.exports = {

    parser: '@babel/eslint-parser', // Používá Babel parser pro podporu moderních JavaScriptových funkcí
    env: {
        browser: true, // Definuje globální proměnné pro prostředí webového prohlížeče
        es6: true, // Umožňuje syntaxi ES6
        node: true, // Definuje globální proměnné pro prostředí Node.js
    },
    plugins: [
        'cypress', 'import',
    ],
    globals: {
        "cy": "readonly",
        "Cypress": "readonly"
    },
    rules: {
        'no-console': 'warn', // Varuje při použití console.log
        // 'quotes': ['error', 'single'], // Vyžaduje jednoduché uvozovky
        // 'semi': ['error', 'single'], // Vyžaduje středníky
    },
};
