export const ADVANCED_SEARCH_INDEX = 'advancedSearch';

export const browseCallNumberOptions = {
  CALL_NUMBERS: 'callNumbers',
  DEWEY: 'dewey',
  LIBRARY_OF_CONGRESS: 'lc',
  LOCAL: 'local',
  NATIONAL_LIBRARY_OF_MEDICINE: 'nlm',
  OTHER: 'other',
  SUPERINTENDENT: 'sudoc',
};

export const browseClassificationOptions = {
  CLASSIFICATION_ALL: 'classificationAll',
  DEWEY_CLASSIFICATION: 'deweyClassification',
  LC_CLASSIFICATION: 'lcClassification',
};

export const browseClassificationIndexToId = {
  [browseClassificationOptions.CLASSIFICATION_ALL]: 'all',
  [browseClassificationOptions.DEWEY_CLASSIFICATION]: 'dewey',
  [browseClassificationOptions.LC_CLASSIFICATION]: 'lc',
};

export const browseModeOptions = {
  ...browseCallNumberOptions,
  ...browseClassificationOptions,
  CONTRIBUTORS: 'contributors',
  SUBJECTS: 'browseSubjects',
};

export const queryIndexes = {
  SUBJECT: 'subject',
  QUERY_SEARCH: 'querySearch',
  CALL_NUMBER: 'callNumber',
  DEWEY: 'dewey',
  LIBRARY_OF_CONGRESS: 'lc',
  LOCAL: 'local',
  NATIONAL_LIBRARY_OF_MEDICINE: 'nlm',
  OTHER: 'other',
  SUPERINTENDENT: 'sudoc',
  CLASSIFICATION_ALL: browseClassificationOptions.CLASSIFICATION_ALL,
  DEWEY_CLASSIFICATION: browseClassificationOptions.DEWEY_CLASSIFICATION,
  LC_CLASSIFICATION: browseClassificationOptions.LC_CLASSIFICATION,
  CONTRIBUTOR: 'contributor',
  ADVANCED_SEARCH: ADVANCED_SEARCH_INDEX,
};
