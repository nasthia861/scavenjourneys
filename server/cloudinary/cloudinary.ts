import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  secure: true
});

const uploadImage = async (imagePath: string, filename: string, folder: string) => {

  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    public_id: `${folder}/${filename}`,
    folder: folder
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage