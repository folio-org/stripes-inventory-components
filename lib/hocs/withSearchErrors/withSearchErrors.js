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
  };

  return SearchErrors;
};

export { withSearchErrors };
