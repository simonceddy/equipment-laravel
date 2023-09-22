import Heading from '@tiptap/extension-heading';
import { headingClassMap } from '../support';

const CustomHeading = Heading.extend({
  levels: [2, 3, 4, 5],
  addAttributes() {
    // console.log(this.options);
    return {
      level: {
        default: 2
      },
      class: {
        default: null,
        renderHTML(attributes) {
          // console.log(attributes);
          const c = `content-heading ${attributes.level && headingClassMap[attributes.level]
            ? headingClassMap[attributes.level]
            : 'text-5xl'}`;
          return {
            class: c
          };
        }
      }
    };
  }
});

export default CustomHeading;
