# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
/Volumes/Daniel7w7rSSD/programacion/url-is-secure
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── icons
│   │   ├── icon128.png
│   │   ├── icon16.png
│   │   ├── icon32.png
│   │   └── icon48.png
│   ├── logoWithoutBg.png
│   ├── manifest.json
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── index.ts
│   │   └── urlScanApi.ts
│   ├── background.ts
│   ├── components
│   │   ├── StatusBtn.tsx
│   │   ├── SwitchBtn.tsx
│   │   ├── WarningDialog.tsx
│   │   └── index.ts
│   ├── content.js
│   ├── hooks
│   │   ├── index.ts
│   │   └── useManagementURL.ts
│   ├── main.tsx
│   ├── store
│   │   ├── index.ts
│   │   ├── slices
│   │   │   ├── index.ts
│   │   │   └── settingsSlice.ts
│   │   └── store.ts
│   ├── styles
│   │   └── index.css
│   ├── util
│   │   ├── formatTimeHHmmss.ts
│   │   └── index.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

11 directories, 38 files