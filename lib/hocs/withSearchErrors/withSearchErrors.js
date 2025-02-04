import {
  useEffect,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import {
  useCallout,
  useStripes,
} from '@folio/stripes/core';

import PropTypes from 'prop-types';
import { processSearchErrors } from '../../utils';

const withSearchErrors = (WrappedComponent) => {
  const SearchErrors = (props) => {
    const intl = useIntl();
    const callout = useCallout();
    const stripes = useStripes();

    const [isRequestUrlExceededLimit, setIsRequestUrlExceededLimit] = useState(false);

    const error = props.resources.records.failed;
    const host = stripes.okapi.url;
    const recordsManifest = WrappedComponent.manifest.records;
    const pathname = recordsManifest.GET.path;
    const manifestParams = recordsManifest.GET.params;
    const limit = recordsManifest.perRequest;
    const requestUrlQuery = props.resources.requestUrlQuery;

    useEffect(() => {
      return () => {
        // reset the state of records on unmount to avoid an error from a previous request what will trigger
        // the toast notification again when the component is remounted.
        props.mutator?.records?.reset();
      };
    }, []);

    useEffect(() => {
      if (error) {
        const params = {
          ...manifestParams,
          query: requestUrlQuery,
          limit,
        };

        processSearchErrors({ error, callout, intl, pathname, host, params, setIsRequestUrlExceededLimit });
      } else {
        setIsRequestUrlExceededLimit(false);
      }
    }, [error]);

    return (
      <WrappedComponent
        {...props}
        isRequestUrlExceededLimit={isRequestUrlExceededLimit}
      />
    );
  };

  SearchErrors.manifest = WrappedComponent.manifest;
  SearchErrors.propTypes = {
    resources: PropTypes.object.isRequired,
    mutator: PropTypes.shape({
      records: PropTypes.shape({
        reset: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  return SearchErrors;
};

export { withSearchErrors };
