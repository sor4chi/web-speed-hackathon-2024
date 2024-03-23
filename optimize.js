import { glob } from 'fast-glob';
import sharp from 'sharp';

await Promise.all(
  (await glob('./workspaces/client/assets/images/hero.png')).map(async (path) => {
    const ratio = 16 / 9;
    [1024, 768, 640, 320].forEach(async (width) => {
      await sharp(path)
        .resize({
          fit: 'cover',
          height: Math.round(width / ratio),
          width,
        })
        .webp({ quality: 75 })
        .toFile(path.replace('.png', `-${width}.webp`));
    });
  }),
);
