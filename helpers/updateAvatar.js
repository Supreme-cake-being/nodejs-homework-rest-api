import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';

const tempPath = path.resolve('tmp');
const avatarsPath = path.resolve('public/avatars');

const updateAvatar = async (buffer, id) => {
  const avatar = await Jimp.read(buffer);
  const filePath = path.join(tempPath, `${id}.jpg`);

  await avatar.resize(250, 250).writeAsync(filePath);

  const fileName = `${id}-${Date.now()}.jpg`;

  const newFileName = path.join(avatarsPath, fileName);

  await avatar.writeAsync(newFileName);
  await fs.unlink(filePath);
  return `/public/avatars/${fileName}`;
};

export default updateAvatar;
