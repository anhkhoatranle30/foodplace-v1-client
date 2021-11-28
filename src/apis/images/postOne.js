import { imageRootApi } from '../root';

const postOne = (imageFile) => {
  const bodyFormData = new FormData();
  bodyFormData.append('image', imageFile);
  return imageRootApi.post(`/images`, bodyFormData);
};

export default postOne;
