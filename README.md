# Eslint plugin for linting [@dhmk/atom](https://github.com/dhmk083/dhmk-atom).

Right now, it has one rule which detects missing `()`. This mostly happens while checking some conditions or accessing `.length` property on array atom.

Some examples:

```js
const a = atom(true);

// should be a()
if (a) console.log("true");

const b = atom([1, 2, 3]);

// should be b().length
// since functions also have .length property, typescript won't detect an error
console.log("array length: ", b.length);
```

## Install

```sh
npm install -D @typescript-eslint/parser @dhmk/eslint-plugin-atom
```

Next, activate it in your `.eslintrc.js` file:

```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
  plugins: ["@dmhk/atom"],
  rules: {
    "@dhmk/atom/missing-call": "warn",
  },
};
```

See [typescript-eslint docs](https://typescript-eslint.io/docs/linting/type-linting/) for more help.
