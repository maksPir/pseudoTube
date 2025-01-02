export const countOfSkip = (dataFilms: { count: number }, count: number) => {
  if (dataFilms) {
    if (dataFilms?.count > count) {
      const clientHeight = document.documentElement.clientHeight;
      const heightOneElem = (clientHeight * 40) / 100 + 40;
      const clientWidth = document.documentElement.clientWidth;
      const oneWidth = 340;
      const countInRow = Math.floor((clientWidth - 60) / oneWidth);
      //const indexOfBottomElem = ((2 * clientHeight) / heightOneElem) * countInRow;
      const k = 30 / countInRow; ////////////////////

      const resHeight = k * heightOneElem - 100;
      return resHeight;
    } else {
      const clientHeight = document.documentElement.clientHeight;
      const heightOneElem = (clientHeight * 40) / 100 + 40;
      const clientWidth = document.documentElement.clientWidth;
      const oneWidth = 340;
      const countInRow = Math.floor((clientWidth - 60) / oneWidth);
      const k = (dataFilms?.count - 5) / countInRow;
      const resHeight = k * heightOneElem + 300;
      return resHeight;
    }
  }
};
