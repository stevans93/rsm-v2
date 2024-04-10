const sharp = require('sharp');
const { MEDIA_LOCATION } = require('../config/config');
const fs = require('fs');
const path = require('path');

const deleteFiles = (toDelete) => {
  const deletePath = MEDIA_LOCATION;

  toDelete?.forEach((f) => {
    try {
      fs.unlinkSync(`${deletePath}/${f}`);
    } catch (err) {
      console.error('Greška pri brisanju fajla:', err.message);
    }
  });
};

const compressImages = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const file = req.file
  try {
    const ext = path.extname(file.originalname);
    if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
      const fileBuffer = fs.readFileSync(file.path)
      await sharp(fileBuffer)
        .toFormat('jpeg')  // Postavite format na JPEG da bi se oba formata obrađivala na isti način
        .jpeg({ quality: 80 })
        .toFile(`${MEDIA_LOCATION}/C${file.filename}`);
    }


    const deletedImages = [file.filename] ?? [];
    deleteFiles(deletedImages);
    req.file.filename = `C${file.filename}`;
  } catch (error) {
    console.error('Greška pri komprimiranju slika:', error.message);
  }

  next();
};

module.exports = compressImages;
