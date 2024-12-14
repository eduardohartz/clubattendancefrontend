import antfu from "@antfu/eslint-config"
import js from "@eslint/js"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default antfu(
    {
        stylistic: {
            indent: 4,
            quotes: "double",
            semi: false,

        },
        ignores: ["dist", "**/*.json"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    { ignores: ["dist", "**/*.json"] },
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            react,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "style/brace-style": "off",
            "style/padded-blocks": "off",
            "ts/no-use-before-define": "off",
            "style/multiline-ternary": "off",
            "no-alert": "off",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
)
