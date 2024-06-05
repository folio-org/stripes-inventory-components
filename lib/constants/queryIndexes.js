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
  INSTANCE_KEYWORD: 'instanceKeyword',
  TITLE: 'title',
  IDENTIFIER: 'identifier',
  NORMALIZED_CLASSIFICATION_NUMBER: 'normalizedClassificationNumber',
  ISBN: 'isbn',
  ISSN: 'issn',
  LCCN: 'lccn',
  OCLC: 'oclc',
  INSTANCE_NOTES: 'instanceNotes',
  INSTANCE_ADMINISTRATIVE_NOTES: 'instanceAdministrativeNotes',
  SUBJECT: 'subject',
  INSTANCE_HRID: 'hrid',
  INSTANCE_ID: 'id',
  AUTHORITY_ID: 'authorityId',
  ALL_FIELDS: 'allFields',
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
  HOLDINGS_KEYWORD: 'holdingsKeyword',
  HOLDINGS_FULL_CALL_NUMBERS: 'holdingsFullCallNumbers',
  CALL_NUMBER_NORMALIZED: 'callNumberNormalized',
  HOLDINGS_NOTES: 'holdingsNotes',
  HOLDINGS_ADMINISTRATIVE_NOTES: 'holdingsAdministrativeNotes',
  HOLDINGS_HRID: 'holdingsHrid',
  HOLDINGS_ID: 'holdingsId',
  ITEMS_KEYWORD: 'itemsKeyword',
  ITEMS_BARCODE: 'items.barcode',
  ITEM_FULL_CALL_NUMBERS: 'itemFullCallNumbers',
  ITEM_NORMALIZED_CALL_NUMBERS: 'itemNormalizedCallNumbers',
  ITEM_NOTES: 'itemNotes',
  ITEM_ADMINISTRATIVE_NOTES: 'itemAdministrativeNotes',
  ITEM_CIRCULATION_NOTES: 'itemCirculationNotes',
  ITEM_HRID: 'itemHrid',
  ITEM_ID: 'iid',
};
