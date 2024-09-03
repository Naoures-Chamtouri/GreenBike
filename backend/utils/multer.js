import multer from "multer";
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./student/uploads");
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${file.originalname}-${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage: storage });
export default  upload;
