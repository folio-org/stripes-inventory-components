export const advancedSearchQueryBuilder = (rows) => {
  const formatRowCondition = (row) => {
    const query = `${row.searchOption} ${row.match} ${row.query}`;
    return query;
  };

  return rows.reduce((formattedQuery, row, index) => {
    const rowCondition = formatRowCondition(row);

    if (index === 0) {
      return rowCondition;
    }

    return `${formattedQuery} ${row.bool} ${rowCondition}`;
  }, '');
};
