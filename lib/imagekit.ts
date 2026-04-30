import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  // publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.REACT_APP_IMAGEKIT_PRIVATE_KEY!,
  // urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT!
});
// Basic URL without transformations
imagekit.helper.buildSrc({
  urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT!,
  src: '/path/to/image.jpg',
});

export default imagekit;
