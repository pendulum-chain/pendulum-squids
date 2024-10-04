// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config({
    ignores: [
        '**/*.js',
        'node_modules/**',
        'src/abi/**',
        'src/types/**',
        'src/model/**',
        'eslint.config.mjs',
    ],
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            projectService: true,
            ecmaVersion: 'latest',
            tsconfigRootDir: './tsconfig.json',
        },
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': ['error'],
        'require-await': 'error',
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
})
