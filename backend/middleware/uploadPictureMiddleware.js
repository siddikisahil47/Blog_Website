import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "uploads");
        cb(null, uploadPath);        
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1000000, // 1MB
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return cb(new Error("Only images are allowed"));
        }
        cb(null, true);
    },
});

export { uploadPicture };