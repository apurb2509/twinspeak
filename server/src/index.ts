// src/index.ts
import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {origin: "http://localhost:8080"};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Cloudinary config ---
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET ? '***' : 'Missing'
});
// --- Multer setup for file upload ---
const tempUploadsDir = path.join(__dirname, 'temp-uploads');

if (!fs.existsSync(tempUploadsDir)) {
  fs.mkdirSync(tempUploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, tempUploadsDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});


// Accept only image files
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

// --- Upload endpoint ---
app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: 'temp-uploads',
    });

    // Delete temp file after upload
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
  return imageUrl;
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});