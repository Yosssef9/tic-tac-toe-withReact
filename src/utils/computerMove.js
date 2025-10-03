export default function computerMove(squares, computerSymbol, playerSymbol) {
  // كل خطوط الفوز الممكنة
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // الصفوف
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // الأعمدة
    [0, 4, 8],
    [2, 4, 6], // الأقطار
  ];

  // 1) لو الكمبيوتر يقدر يكسب
  for (let [a, b, c] of lines) {
    if (
      squares[a] === computerSymbol &&
      squares[b] === computerSymbol &&
      !squares[c]
    )
      return c;
    if (
      squares[a] === computerSymbol &&
      squares[c] === computerSymbol &&
      !squares[b]
    )
      return b;
    if (
      squares[b] === computerSymbol &&
      squares[c] === computerSymbol &&
      !squares[a]
    )
      return a;
  }

  // 2) لو اللاعب ممكن يكسب → امنعه
  for (let [a, b, c] of lines) {
    if (
      squares[a] === playerSymbol &&
      squares[b] === playerSymbol &&
      !squares[c]
    )
      return c;
    if (
      squares[a] === playerSymbol &&
      squares[c] === playerSymbol &&
      !squares[b]
    )
      return b;
    if (
      squares[b] === playerSymbol &&
      squares[c] === playerSymbol &&
      !squares[a]
    )
      return a;
  }

  // 3) مفيش → Random
  const emptySquares = squares
    .map((sq, i) => (sq ? null : i))
    .filter((i) => i !== null);
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}
