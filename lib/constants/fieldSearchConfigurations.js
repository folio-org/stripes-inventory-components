export const fieldSearchConfigurations = {
  keyword: {
    exactPhrase: 'keyword=="%{query.query}"',
    containsAll: 'keyword all "%{query.query}"',
    startsWith: 'keyword all "%{query.query}*"',
    containsAny: 'keyword any "%{query.query}"',
  },
  contributor: {
    exactPhrase: 'contributors.name=="%{query.query}"',
    containsAll: 'contributors.name="*%{query.query}*"',
    startsWith: 'contributors.name="%{query.query}*"',
    containsAny: 'contributors.name any "*%{query.query}*"',
  },
  title: {
    exactPhrase: 'title=="%{query.query}"',
    containsAll: 'title all "%{query.query}"',
    startsWith: 'title all "%{query.query}*"',
    containsAny: 'title any "%{query.query}"',
  },
  isbn: {
    exactPhrase: 'isbn=="%{query.query}"',
    containsAll: 'isbn="*%{query.query}*"',
    startsWith: 'isbn="%{query.query}*"',
    containsAny: 'isbn any "*%{query.query}*"',
  },
  issn: {
    exactPhrase: 'issn=="%{query.query}"',
    containsAll: 'issn="*%{query.query}*"',
    startsWith: 'issn="%{query.query}*"',
    containsAny: 'issn any "*%{query.query}*"',
  },
  lccn: {
    exactPhrase: 'lccn=="%{query.query}"',
    containsAll: 'lccn="*%{query.query}*"',
    startsWith: 'lccn="%{query.query}*"',
    containsAny: 'lccn any "*%{query.query}*"',
  },
  identifier: {
    exactPhrase: 'identifiers.value=="%{query.query}"',
    containsAll: 'identifiers.value="*%{query.query}*"',
    startsWith: 'identifiers.value="%{query.query}*"',
    containsAny: 'identifiers.value any "*%{query.query}*"',
  },
  normalizedClassificationNumber: {
    exactPhrase: 'normalizedClassificationNumber=="%{query.query}"',
    containsAll: 'normalizedClassificationNumber="*%{query.query}*"',
    startsWith: 'normalizedClassificationNumber="%{query.query}*"',
    containsAny: ({ query }) => {
      // BE doesn't support the `any` operator for `normalizedClassificationNumber` due to its normalization.
      // But UI can split the user input by spaces to get correct results.
      return query.split(/\s/)
        .filter(Boolean)
        .map(q => q.replaceAll('"', '\\"'))
        .map(q => `normalizedClassificationNumber any "*${q}*"`)
        .join(' or ');
    },
  },
  oclc: {
    exactPhrase: 'oclc=="%{query.query}"',
    containsAll: 'oclc="*%{query.query}*"',
    startsWith: 'oclc="%{query.query}*"',
    containsAny: 'oclc any "*%{query.query}*"',
  },
  instanceNotes: {
    exactPhrase: 'notes.note=="%{query.query}" or administrativeNotes=="%{query.query}"',
    containsAll: 'notes.note all "%{query.query}" or administrativeNotes all "%{query.query}"',
    startsWith: 'notes.note all "%{query.query}*" or administrativeNotes all "%{query.query}*"',
    containsAny: 'notes.note any "%{query.query}" or administrativeNotes any "%{query.query}"',
  },
  instanceAdministrativeNotes: {
    exactPhrase: 'administrativeNotes=="%{query.query}"',
    containsAll: 'administrativeNotes all "%{query.query}"',
    startsWith: 'administrativeNotes all "%{query.query}*"',
    containsAny: 'administrativeNotes any "%{query.query}"',
  },
  placeOfPublication: {
    exactPhrase: 'publication.place=="%{query.query}"',
    containsAll: 'publication.place=="%{query.query}"',
    startsWith: 'publication.place=="%{query.query}*"',
    containsAny: 'publication.place=="%{query.query}"',
  },
  subject: {
    exactPhrase: 'subjects.value=="%{query.query}"',
    containsAll: 'subjects.value all "%{query.query}"',
    startsWith: 'subjects.value=="%{query.query}*"',
    containsAny: 'subjects.value any "%{query.query}"',
  },
  callNumber: {
    exactPhrase: 'itemEffectiveShelvingOrder=="%{query.query}"',
    containsAll: 'itemEffectiveShelvingOrder="*%{query.query}*"',
    startsWith: 'itemEffectiveShelvingOrder=="%{query.query}*"',
    containsAny: 'itemEffectiveShelvingOrder any "*%{query.query}*"',
  },
  hrid: {
    exactPhrase: 'hrid=="%{query.query}"',
    containsAll: 'hrid=="*%{query.query}*"',
    startsWith: 'hrid=="%{query.query}*"',
    containsAny: 'hrid any "*%{query.query}*"',
  },
  id: {
    exactPhrase: 'id=="%{query.query}"',
    containsAll: 'id="*%{query.query}*"',
    startsWith: 'id="%{query.query}*"',
    containsAny: 'id any "*%{query.query}*"',
  },
  authorityId: {
    exactPhrase: 'authorityId == %{query.query}',
    containsAll: 'authorityId=="*%{query.query}*"',
    startsWith: 'authorityId=="%{query.query}*"',
    containsAny: 'authorityId any "*%{query.query}*"',
  },
  allFields: {
    exactPhrase: 'cql.all=="%{query.query}"',
    containsAll: 'cql.all="%{query.query}"',
    startsWith: 'cql.all="%{query.query}*"',
    containsAny: 'cql.all any "%{query.query}"',
  },
  holdingsFullCallNumbers: {
    exactPhrase: 'holdingsFullCallNumbers=="%{query.query}"',
    containsAll: 'holdingsFullCallNumbers="*%{query.query}*"',
    startsWith: 'holdingsFullCallNumbers="%{query.query}*"',
    containsAny: 'holdingsFullCallNumbers any "*%{query.query}*"',
  },
  holdingsNormalizedCallNumbers: {
    exactPhrase: 'holdingsNormalizedCallNumbers=="%{query.query}"',
    containsAll: 'holdingsNormalizedCallNumbers="*%{query.query}*"',
    startsWith: 'holdingsNormalizedCallNumbers="%{query.query}*"',
    containsAny: 'holdingsNormalizedCallNumbers any "*%{query.query}*"',
  },
  holdingsNotes: {
    exactPhrase: 'holdings.notes.note=="%{query.query}" or holdings.administrativeNotes=="%{query.query}"',
    containsAll: 'holdings.notes.note all "%{query.query}" or holdings.administrativeNotes all "%{query.query}"',
    startsWith: 'holdings.notes.note all "%{query.query}*" or holdings.administrativeNotes all "%{query.query}*"',
    containsAny: 'holdings.notes.note any "%{query.query}" or holdings.administrativeNotes any "%{query.query}"',
  },
  holdingsAdministrativeNotes: {
    exactPhrase: 'holdings.administrativeNotes=="%{query.query}"',
    containsAll: 'holdings.administrativeNotes all "%{query.query}"',
    startsWith: 'holdings.administrativeNotes all "%{query.query}*"',
    containsAny: 'holdings.administrativeNotes any "%{query.query}"',
  },
  holdingsHrid: {
    exactPhrase: 'holdings.hrid=="%{query.query}"',
    containsAll: 'holdings.hrid=="*%{query.query}*"',
    startsWith: 'holdings.hrid=="%{query.query}*"',
    containsAny: 'holdings.hrid any "*%{query.query}*"',
  },
  hid: {
    exactPhrase: 'holdings.id=="%{query.query}"',
    containsAll: 'holdings.id="*%{query.query}*"',
    startsWith: 'holdings.id="%{query.query}*"',
    containsAny: 'holdings.id any "*%{query.query}*"',
  },
  barcode: {
    exactPhrase: 'items.barcode=="%{query.query}"',
    containsAll: 'items.barcode="*%{query.query}*"',
    startsWith: 'items.barcode="%{query.query}*"',
    containsAny: 'items.barcode any "*%{query.query}*"',
  },
  itemFullCallNumbers: {
    exactPhrase: 'itemFullCallNumbers=="%{query.query}"',
    containsAll: 'itemFullCallNumbers="*%{query.query}*"',
    startsWith: 'itemFullCallNumbers="%{query.query}*"',
    containsAny: 'itemFullCallNumbers any "*%{query.query}*"',
  },
  itemNormalizedCallNumbers: {
    exactPhrase: 'itemNormalizedCallNumbers=="%{query.query}"',
    containsAll: 'itemNormalizedCallNumbers="*%{query.query}*"',
    startsWith: 'itemNormalizedCallNumbers="%{query.query}*"',
    containsAny: 'itemNormalizedCallNumbers any "*%{query.query}*"',
  },
  itemNotes: {
    exactPhrase: 'item.notes.note=="%{query.query}" or item.administrativeNotes=="%{query.query}"',
    containsAll: 'item.notes.note all "%{query.query}" or item.administrativeNotes all "%{query.query}"',
    startsWith: 'item.notes.note all "%{query.query}*" or item.administrativeNotes all "%{query.query}*"',
    containsAny: 'item.notes.note any "%{query.query}" or item.administrativeNotes any "%{query.query}"',
  },
  itemAdministrativeNotes: {
    exactPhrase: 'item.administrativeNotes=="%{query.query}"',
    containsAll: 'item.administrativeNotes all "%{query.query}"',
    startsWith: 'item.administrativeNotes all "%{query.query}*"',
    containsAny: 'item.administrativeNotes any "%{query.query}"',
  },
  itemCirculationNotes: {
    exactPhrase: 'item.circulationNotes.note=="%{query.query}"',
    containsAll: 'item.circulationNotes.note all "%{query.query}"',
    startsWith: 'item.circulationNotes.note all "%{query.query}*"',
    containsAny: 'item.circulationNotes.note any "%{query.query}"',
  },
  itemHrid: {
    exactPhrase: 'items.hrid=="%{query.query}"',
    containsAll: 'items.hrid="*%{query.query}*"',
    startsWith: 'items.hrid="%{query.query}*"',
    containsAny: 'items.hrid any "*%{query.query}*"',
  },
  iid: {
    exactPhrase: 'item.id=="%{query.query}"',
    containsAll: 'item.id="*%{query.query}*"',
    startsWith: 'item.id="%{query.query}*"',
    containsAny: 'item.id any "*%{query.query}*"',
  },
};
