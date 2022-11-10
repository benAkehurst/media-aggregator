const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.imageUploader = async (shotResult, cloudinary_options) => {
  return new Promise(function (res, rej) {
    cloudinary.uploader
      .upload_stream(cloudinary_options, function (error, cloudinary_result) {
        if (error) {
          console.error('Upload to cloudinary failed: ', error);
          rej(error);
        }
        res(cloudinary_result);
      })
      .end(shotResult);
  });
};
