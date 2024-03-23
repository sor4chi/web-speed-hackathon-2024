type Params = {
  query: string;
  target: string;
};

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  // カタカナ・半角・全角をすべてひらがなに変換する
  const normalizedQuery = query.normalize('NFKC').replace(/[ァ-ンｧ-ﾝ]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0x60);
  });
  const normalizedTarget = target.normalize('NFKC').replace(/[ァ-ンｧ-ﾝ]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0x60);
  });

  // target の先頭から順に query が含まれているかを調べる
  TARGET_LOOP: for (let offset = 0; offset <= normalizedTarget.length - normalizedQuery.length; offset++) {
    for (let idx = 0; idx < normalizedQuery.length; idx++) {
      if (normalizedTarget[offset + idx] !== normalizedQuery[idx]) {
        continue TARGET_LOOP;
      }
    }
    // query のすべての文字が含まれていたら true を返す
    return true;
  }

  // target の最後まで query が含まれていなかったら false を返す
  return false;
}
