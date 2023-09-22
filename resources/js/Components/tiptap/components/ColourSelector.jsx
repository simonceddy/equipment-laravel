/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import TiptapMenuBtn from './TiptapMenuBtn';

const themeColours = [
  { className: 'white', label: 'white', value: '#ffffff' },
  { className: 'dandelion', label: 'dandelion', value: '#fed361' },
  { className: 'pastel-green', label: 'pastel-green', value: '#84ee95' },
  { className: 'pastel-green-dark', label: 'pastel-green-dark', value: '#69c078' },
  { className: 'cornflower-blue', label: 'cornflower-blue', value: '#5dabf4' },
  { className: 'cornflower-blue-dark', label: 'cornflower-blue-dark', value: '#4c8bc6' },
  { className: 'black', label: 'black', value: '#000000' },
  { className: 'aqua-spring', label: 'aqua-spring', value: '#effaf6' },
];

/**
 * @typedef {object} props
 * @property {import('@tiptap/react').Editor} editor
 */

/**
 * @param {props} props
 */
function ColourSelector({ editor }) {
  const [visible, setVisible] = useState(false);
  const [clr, setClr] = useState(editor.getAttributes('textStyle').color || '#000000');
  // console.log(editor.getAttributes('fontFamily'));
  // Need to get selected element and check if colour is added ''

  const setColour = (c) => {
    editor.chain().focus().setColor(c).run();

    setClr(editor.getAttributes('textStyle').color);
  };

  useEffect(() => {
    setClr(editor.getAttributes('textStyle').color || '#000000');
  }, [editor.state.selection]);

  return (
    <div className="relative block">
      {}
      <TiptapMenuBtn
        onClick={() => setVisible(!visible)}
        className={`${visible ? 'is-active' : ''} w-[1.6rem] h-[1.6rem] col justify-center items-center`}
      >
        <span className="w-[1.1rem] h-[1.1rem] border block border-black" style={{ backgroundColor: clr }} />
      </TiptapMenuBtn>
      {visible && (
      <div className="absolute top-[101%] z-30 left-[-4%] col justify-start items-start bg-white rounded">
        <span className="w-full bg-cornflower-blue/50 p-0.5 mb-0.5 border-b border-black">
          Theme Colours
        </span>
        <div className="row p-1 justify-start items-center">
          {themeColours.map(({ value }, id) => (
            <TiptapMenuBtn
              key={`theme-button-${id}`}
              onClick={() => setColour(value)}
              className={`${visible ? 'is-active' : ''} w-[1.6rem] h-[1.6rem] col justify-center items-center`}
            >
              <span
                className="w-[1.1rem] h-[1.1rem] border block border-black"
                style={{
                  backgroundColor: value
                }}
              />
            </TiptapMenuBtn>
          ))}
        </div>
        <span className="w-full bg-cornflower-blue/50 p-0.5 mb-0.5 border-b border-black">
          Colour Picker
        </span>
        <div className="p-0.5 w-full col justify-center items-center">
          <HexColorPicker
            className="border border-black rounded-lg"
            color={clr}
            onChange={(c) => {
              setColour(c);
            // setVisible(false);
            // TODO handle colour change
            }}
          />
        </div>
      </div>
      )}
    </div>
  );
}

export default ColourSelector;
