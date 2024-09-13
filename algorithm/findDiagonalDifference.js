function findDiagonalDifference(matrix) {
  if (!matrix) {
    return "Matrix is needed";
  }

  for (const elements of matrix) {
    if (elements.length !== matrix.length) {
      return "Inputted Matrix is not valid";
    }
  }

  if (matrix.length === 1) {
    return "Difference of the matrix diagonals can not be determined since matrix is not counted as NxN";
  }

  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;

  for (let i = 0; i < matrix.length; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][matrix.length - i - 1];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2 = [
  [1, 2, 0],
  [4, 5, 6],
];

const matrix3 = [
  [1, 2, 0],
  [4, 6],
  [7, 8, 9],
];

const matrix4 = [[], [], []];

const matrix5 = [];

const matrix6 = [
  [1, 2],
  [4, 6],
];

const matrix7 = [[1]];

console.log("With matrix", findDiagonalDifference(matrix));
console.log("With matrix 2", findDiagonalDifference(matrix2));
console.log("With matrix 3", findDiagonalDifference(matrix3));
console.log("With matrix 4", findDiagonalDifference(matrix4));
console.log("With matrix 5", findDiagonalDifference(matrix5));
console.log("With undefined matrix", findDiagonalDifference());
console.log("With matrix 2x2", findDiagonalDifference(matrix6));
console.log("With matrix 2x2", findDiagonalDifference(matrix7));
