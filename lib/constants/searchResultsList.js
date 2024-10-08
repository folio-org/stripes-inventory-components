import { FormattedMessage } from 'react-intl';

import { SORT_OPTIONS } from './constants';

export const SEARCH_COLUMN_NAMES = {
  TITLE: SORT_OPTIONS.TITLE,
  CONTRIBUTORS: SORT_OPTIONS.CONTRIBUTORS,
  PUBLISHERS: 'publishers',
  DATE: SORT_OPTIONS.DATE,
};

export const SEARCH_COLUMN_MAPPINGS = {
  [SEARCH_COLUMN_NAMES.TITLE]: <FormattedMessage id="stripes-inventory-components.instances.columns.title" />,
  [SEARCH_COLUMN_NAMES.CONTRIBUTORS]: <FormattedMessage id="stripes-inventory-components.instances.columns.contributors" />,
  [SEARCH_COLUMN_NAMES.PUBLISHERS]: <FormattedMessage id="stripes-inventory-components.instances.columns.publishers" />,
  [SEARCH_COLUMN_NAMES.DATE]: <FormattedMessage id="stripes-inventory-components.instances.columns.date" />,
};

export const SEARCH_VISIBLE_COLUMNS = [
  SEARCH_COLUMN_NAMES.TITLE,
  SEARCH_COLUMN_NAMES.CONTRIBUTORS,
  SEARCH_COLUMN_NAMES.PUBLISHERS,
  SEARCH_COLUMN_NAMES.DATE,
];
