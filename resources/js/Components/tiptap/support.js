export const headingClassMap = {
  2: 'text-5xl',
  3: 'text-4xl',
  4: 'text-3xl',
  5: 'text-2xl',
};

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = () => {
      resolve(fr.result);
    };

    fr.onerror = () => {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
}
