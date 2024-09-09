import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  DEFAULT_SORT,
  DISPLAY_SETTINGS_KEY,
  DISPLAY_SETTINGS_SCOPE,
} from '../../constants';

const defaultDisplaySettings = {
  defaultSort: DEFAULT_SORT,
};

const useDisplaySettingsQuery = ({ tenantId }) => {
  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'display-settings' });

  const { data, isFetching } = useQuery(
    [namespace, tenantId],
    () => ky.get('settings/entries', {
      searchParams: {
        query: `key=="${DISPLAY_SETTINGS_KEY}" and scope=="${DISPLAY_SETTINGS_SCOPE}"`,
      },
    }).json(),
  );

  return {
    displaySettings: data?.items?.[0]?.value || defaultDisplaySettings,
    isLoading: isFetching,
  };
};

export { useDisplaySettingsQuery };
