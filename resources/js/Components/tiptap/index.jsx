import React from 'react';
import { createRoot } from 'react-dom/client';
import Tiptap from './Tiptap';

const container = document.getElementById('tiptap-container');

const root = createRoot(container);

/**
 * @type {HTMLTextAreaElement}
 */
const inputEl = document.getElementById('tiptap-body');

root.render(
  <React.StrictMode>
    <Tiptap
      content={inputEl.value}
      setContent={(html) => {
        inputEl.value = html;
      }}
    />
  </React.StrictMode>
);
