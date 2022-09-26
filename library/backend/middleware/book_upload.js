const multer = require("multer");
const Path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/books");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const acceptableExt = [".pdf"];
    if (!acceptableExt.includes(Path.extname(file.originalname))) {
        return callback(new Error("Only .pdf format allowed!"));
    }

    const filesize = parseInt(req.headers["content-length"]);

    if (filesize > 5242880) {
        return callback(new Error("File Size Big!"));
    }
    callback(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    filesize: 5242880 // 5 mb
});


module.exports = upload.single("pdf");