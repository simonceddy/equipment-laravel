/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import Modal from '@/Components/Modal';
import FormButton from '@/Components/Forms/FormButton';

function ImageForm({
  onInput, upload, onClose, editor
}) {
  const [imgs, setImgs] = useState([]);

  const getImage = (e) => {
    const hasFiles = e.target?.files?.length;

    if (!hasFiles) {
      return false;
    }
    const images = Array.from(e.target.files).filter((f) => /image/i.test(f.type));

    if (images.length === 0) {
      return false;
    }

    const imageObjects = images.map((file) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        // console.log(image.width);
      };
      image.src = url;
      image.width = 120;

      return {
        image,
        file
      };
    });
    if (onInput) onInput(imageObjects);
    return setImgs(imageObjects);
  };

  const uploadImages = async () => {
    if (imgs.length > 0 && upload) {
      imgs.map(async ({ file, image }) => {
        const src = await upload(file);
        const newImgNode = editor.schema.nodes.image.create({
          src,
          width: image.width,
          height: image.height,
        });
        const transaction = editor.view.state.tr.replaceSelectionWith(newImgNode);
        editor.view.dispatch(transaction);
      });
    }
  };

  return (
    <Modal>
      <div
        className="col p-2 rounded-lg fl bg-aqua-spring border-2 border-cornflower-blue z-50"
      >
        <input type="file" onInput={getImage} />
        <div className="row flex-wrap">
          {imgs.map(({ image }, id) => (
            <img key={`img-${id}-awaiting`} width={image.width} src={image.src} alt="" />
          ))}
        </div>
        <FormButton onClick={() => {
          uploadImages();
          if (onClose) onClose();
        }}
        >
          OK
        </FormButton>
        <FormButton onClick={() => {
          if (onClose) onClose();
        }}
        >
          Cancel
        </FormButton>
      </div>
    </Modal>
  );
}

export default ImageForm;
