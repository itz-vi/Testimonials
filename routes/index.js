const express = require('express');
const router = express.Router();
const testModel = require("./tests");
const upload = require('./multer')
const path = require("path");
const uploadsPath = path.join(__dirname, "uploads");
router.use("/uploads", express.static(uploadsPath));


router.get('/', function (req, res,) {
  res.render('addcard');
});

// --------------   create card ------------- ///
router.get('/addcard', function (req, res, next) {
  res.render('addcard');
});


router.post('/addcard', upload.array('images', 3), async function (req, res) {
  const { name, post, country } = req.body;
  const images = req.files;

  if (images && images.length >= 3) {
    const newTest = await testModel.create({
      name,
      post,
      country,
      images: {
        userimage: images[0].filename,
        flag: images[1].filename,
        comaimage: images[2].filename
      }
    });

    console.log(newTest);
    res.redirect('/test');
  } else {
    // Handle the case where not all required images are uploaded
    res.status(400).send('Please upload all required images.');
  }
});



router.get('/test', async function (req, res, next) {
  const test = await testModel.find();
  res.render('test', { test });
});

module.exports = router;