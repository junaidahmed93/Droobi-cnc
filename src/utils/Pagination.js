export const nextBookings = (state, startingNextCount) => {
  const { shownRecords, storedRecords, startSearch } = state;
  startingNextCount = 0;
  if (shownRecords && shownRecords.length) {
    if (startSearch === false) {
      const id = shownRecords[shownRecords.length - 1].id;
      storedRecords.forEach((v, i) => {
        if (v.id === id) {
          startingNextCount = i + 1;
        }
      });
      if ((startingNextCount + 1) <= storedRecords.length) {
        return startingNextCount;
      }
    }
  }
};
export const previousBookings = (state, startingNextCount) => {
  const { shownRecords, storedRecords, startSearch } = state;
  startingNextCount = 0;
  if (shownRecords && shownRecords.length) {
    if (startSearch === false) {
      const id = shownRecords[0].id;
      storedRecords.forEach((v, i) => {
        if (v.id === id) {
          startingNextCount = i - 10;
        }
      });
      if (startingNextCount >= 0) {
        return startingNextCount;
      }
      return -1;
    }
  }
  return -1;
};

export const startRecord = (state, startingNextCountParam) => {
  let startingNextCount = startingNextCountParam;
  if (state.startSearch === false) {
    if (state.shownRecords.length === 0) {
      startingNextCount = 0;
      return startingNextCount;
    }

    return (startingNextCount === 0 && state.shownRecords.length === 0) ? startingNextCount = 0 : startingNextCount + 1;
  }

  return (startingNextCount === 0 && state.shownRecords.length === 0) ? startingNextCount = 0 : startingNextCount + 1;
};

export const endRecord = (state, startingNextCount) =>
  (startingNextCount === 1 ? state.shownRecords.length : startingNextCount + state.shownRecords.length);

export const totalRecords = (state) => {
  if (state && state.storedRecords) {
    return state.storedRecords.length;
  }
  return 0;
};
