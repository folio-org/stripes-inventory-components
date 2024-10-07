import { OptionSegment } from '@folio/stripes/components';

import PropTypes from 'prop-types';
import styles from './OptionFormatter.css';

const propTypes = {
  option: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
};

const OptionFormatter = ({
  option,
  searchTerm,
}) => {
  if (!option) {
    return null;
  }

  return (
    <OptionSegment searchTerm={searchTerm}>
      <span className={styles.optionLabel}>{option.label}</span>
      <span className={styles.totalRecordsLabel}>{`(${option.count})`}</span>
    </OptionSegment>
  );
};

OptionFormatter.propTypes = propTypes;

export { OptionFormatter };
