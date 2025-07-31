import { FormattedMessage } from 'react-intl';

import { SEARCH_COLUMN_NAMES } from './constants';

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
