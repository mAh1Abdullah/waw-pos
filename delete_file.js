const fs = require('fs');
const path = 'D:/coding/waw-pos/drizzle/0000_cloudy_madelyne_pryor.sql';

try {
  fs.unlinkSync(path);
  console.log('File deleted successfully');
} catch (err) {
  console.error('Error deleting file:', err);
}