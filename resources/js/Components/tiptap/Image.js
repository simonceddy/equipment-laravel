import { Node, nodeInputRule } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/react';

import { uploadImagePlugin } from './uploadImage';

/**
 * Tiptap Extension to upload images
 * @see  https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 * @since 7th July 2021
 *
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */

// interface ImageOptions {
// inline: boolean;
// HTMLAttributes: Record<string, any>;
// }

// declare module "@tiptap/core" {
// interface Commands<ReturnType> {
// image: {
// /**
//  * Add an image
//  */
// setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
// };
// }
// }

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

const classNameFactory = (attributes) => {
  let classNames = 'm-2';
  if (attributes.float) {
    switch (attributes.float) {
      case 0:
        classNames += ' float-none';
        break;
      case 1:
        classNames += ' float-right';
        break;
      case 2:
        classNames += ' float-left';
        break;
      case 3:
        classNames += ' mx-auto';
        break;
      default:
    }
  }
  return classNames;
};

export const TipTapCustomImage = (uploadFn) => Node.create({
  name: 'image',

  addOptions: () => ({
    inline: false,
    HTMLAttributes: {},
  }),

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      class: {
        default: null,
        renderHTML(attributes) {
          // console.log(attributes);
          return {
            class: classNameFactory(attributes)
          };
        }
      },
      width: {
        default: null,
        renderHTML(attributes) {
          // console.log(attributes);
          return {
            width: attributes.width || 320
          };
        }
      },
      height: {
        default: null,
        renderHTML(attributes) {
          // console.log(attributes);
          return {
            height: attributes.height || 320
          };
        }
      },
      float: {
        default: 0
      }
    };
  },

  parseHTML: () => [
    {
      tag: 'img[src]',
      getAttrs: (dom) => {
        if (typeof dom === 'string') return {};
        const element = dom;

        const obj = {
          src: element.getAttribute('src'),
          width: element.getAttribute('width'),
          class: element.getAttribute('class'),
          title: element.getAttribute('title'),
          alt: element.getAttribute('alt'),
          height: element.getAttribute('height'),
        };
        return obj;
      },
    },
  ],
  // eslint-disable-next-line arrow-body-style
  renderHTML: ({ HTMLAttributes }) => {
    // console.log(HTMLAttributes);
    return ['img', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage: (attrs) => ({ state, dispatch }) => {
        const { selection } = state;
        const position = selection.$head ? selection.$head.pos : selection.$to.pos;

        const node = this.type.create(attrs);
        const transaction = state.tr.insert(position, node);
        // console.log('set image command');
        return dispatch?.(transaction);
      },
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          console.log(match);
          const [, alt, src, title,] = match;
          return {
            src,
            alt,
            title,
          };
        }
      }),
    ];
  },
  addProseMirrorPlugins() {
    return [uploadImagePlugin(uploadFn)];
  },
});
