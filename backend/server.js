// server.js


const connectionDb = require('./db/db');
const cloudinary = require("cloudinary")

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const app = require('./src/app');
const port = process.env.PORT || 3000;
connectionDb()
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
