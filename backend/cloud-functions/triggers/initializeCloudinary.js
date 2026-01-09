// To do: implement a better way to initialize cloudinary only once

// export const initializeCloudinary = onRequest(
//   { secrets: ["CLOUDINARY_API_SECRET", "CLOUDINARY_API_KEY"] },
//   (req, res) => {
//     try {
//       cloudinary.config({
//         cloud_name: "cloudinary",
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//         secure: true,
//       });

//       console.log('Cloudinary configuration successful');
//       res.status(200).send('Cloudinary configuration successful');
//     } catch (error) {
//       res.status(500).send('Cloudinary configuration failed');
//     }
//   });
