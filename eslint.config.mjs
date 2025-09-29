import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Base JS/TS Files Configuration
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node,
        // *** 迁移 defineProps 全局变量 (from teacher's globals) ***
        defineProps: "readonly",
        defineOptions:"readonly"
      } 
    } 
  },
  
  // 2. TypeScript Recommended Config
  ...tseslint.configs.recommended,
  
  // 3. Vue Config (Applied to .vue files)
  pluginVue.configs["flat/essential"],
  
  // 4. Vue Parser Options and Custom Rules
  { 
    files: ["**/*.vue"], 
    languageOptions: { 
      parserOptions: { 
        parser: tseslint.parser 
      } 
    },
    // *** 迁移老师的自定义规则 (from teacher's rules) ***
    // 注意：如果您的老师使用的是 vue3-recommended，这里应该使用 'flat/recommended' 
    // 但为保持简洁和直接解决问题，我们只添加自定义规则
    rules: {
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multi-word-component-names": "off",
    }
  },
  
  // 5. JSON Configuration
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  
  // 6. Markdown Configuration
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  
  // 7. CSS Configuration
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);