import { $ } from 'bun';

import imageIds from '../../../../workspaces/server/seeds/images/imageurl.json';

const load = async () => {
  for (const id of imageIds) {
    const path = `${id}.webp`;
    // 縦を650になるようにリサイズ
    // await $`convert ${path} -resize x650 ${path}`;
    await $`mv ${path} ../encrypted`;
  }
};

load();
