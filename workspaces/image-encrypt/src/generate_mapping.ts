const generate_permutation = (size: number): number[] => {
  const permutation = Array.from({ length: size }, (_, index) => index);
  for (let i = permutation.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  return permutation;
};

const COLUMN_SIZE = 5;
const ROW_SIZE = 13;

const from_column = generate_permutation(COLUMN_SIZE);
const from_row = generate_permutation(ROW_SIZE);
const to_column = generate_permutation(COLUMN_SIZE);
const to_row = generate_permutation(ROW_SIZE);

const MAPPING = [];

for (let i = 0; i < COLUMN_SIZE; i++) {
  for (let j = 0; j < ROW_SIZE; j++) {
    MAPPING.push({
      from: { column: from_column[i], row: from_row[j] },
      to: { column: to_column[i], row: to_row[j] },
    });
  }
}

console.log(MAPPING);
