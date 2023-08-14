module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/attribute-hyphenation": "error",
    "vue/attributes-order": "warn",
    "vue/component-options-name-casing": "error",
    "vue/first-attribute-linebreak": "error",
    "vue/html-button-has-type": "error",
    "vue/multi-word-component-names": "error",
    "vue/mustache-interpolation-spacing": "error",
    "vue/no-deprecated-dollar-listeners-api": "warn",
    "vue/no-deprecated-dollar-scopedslots-api": "warn",
    "vue/no-deprecated-events-api": "warn",
    "vue/no-deprecated-filter": "warn",
    "vue/return-in-computed-property": "error",
    "vue/script-indent": "error",
    "vue/v-on-event-hyphenation": "error",
    "vue/valid-define-emits": "error",
    "vue/valid-define-props": "error",
    "vue/valid-next-tick": "error",
    "vue/valid-v-bind": "error",
    "vue/valid-v-else-if": "error",
    "vue/valid-v-else": "error",
    "vue/valid-v-html": "error",
    "vue/valid-v-if": "error",
  },
};
