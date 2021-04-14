const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();
const path = require ("path");
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));

//storage for multer

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })


//Routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/uploadFiles', upload.array("filesToUpload", 12), (req, res, next) => {
  const files = req.files
  console.log(files);
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }

    res.send(files)

})

app.listen(3000, () => console.log('Server started on port 3000'));
