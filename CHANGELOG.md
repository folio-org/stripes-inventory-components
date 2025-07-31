# Change history for stripes-inventory-components

## [2.1.0] (IN PROGRESS)

- [UISINVCOMP-40](https://issues.folio.org/browse/UISINVCOMP-40) "startsWith" search by keyword and title should also search for a title that starts with a quotation mark.
- [UISINVCOMP-70](https://issues.folio.org/browse/UISINVCOMP-70) Change title of Keyword search option of "Advanced search" to remove HRID and UUID.
- [UISINVCOMP-75](https://issues.folio.org/browse/UISINVCOMP-75) Allow tenant to set default columns to display in Inventory results.

## [2.0.5] (https://github.com/folio-org/stripes-inventory-components/tree/v2.0.5) (2025-06-17)

- [UISINVCOMP-72](https://issues.folio.org/browse/UISINVCOMP-72) Append tenant name to all locations in the location facets except those with duplicate ids.

## [2.0.4] (https://github.com/folio-org/stripes-inventory-components/tree/v2.0.4) (2025-05-13)

- Reverted: [UISINVCOMP-63](https://issues.folio.org/browse/UISINVCOMP-63) Display correct Effective location when it exists on multiple tenants.
- [UISINVCOMP-68](https://issues.folio.org/browse/UISINVCOMP-68) Hide tenant names next to locations with duplicate ids across tenants.
- [UISINVCOMP-67](https://issues.folio.org/browse/UISINVCOMP-67) Add "barcode" to title of Keyword option in Item Search tab.

## [2.0.3] (https://github.com/folio-org/stripes-inventory-components/tree/v2.0.3) (2025-04-18)

- [UISINVCOMP-63](https://issues.folio.org/browse/UISINVCOMP-63) Display correct Effective location when it exists on multiple tenants.
- [UISINVCOMP-66](https://issues.folio.org/browse/UISINVCOMP-66) Update query template for ITEMS_KEYWORD in filterConfig.js.

## [2.0.2] (https://github.com/folio-org/stripes-inventory-components/tree/v2.0.2) (2025-04-11)

- [UISINVCOMP-60](https://issues.folio.org/browse/UISINVCOMP-60) Remove default Staff suppress facet settings.

## [2.0.1] (https://github.com/folio-org/stripes-inventory-components/tree/v2.0.1) (2025-04-09)

- [UISINVCOMP-59](https://issues.folio.org/browse/UISINVCOMP-59) Remove "Shelving order" from search option and advanced search on Instance tab.

## [2.0.0] (https://github.com/folio-org/stripes-inventory-components/tree/v2.0.0) (2025-03-13)

- [UISINVCOMP-25](https://issues.folio.org/browse/UISINVCOMP-25) *BREAKING* Replace certain facets UX with `MultiSelection` component.
- [UISINVCOMP-41](https://issues.folio.org/browse/UISINVCOMP-41) Reset `accordionsStatus` in `useFacets` for `Browse` search when `qindex` is changed.
- [UISINVCOMP-47](https://issues.folio.org/browse/UISINVCOMP-47) Apply relevance sort to find instance plugin when selected as default in Display settings.
- [UISINVCOMP-43](https://issues.folio.org/browse/UISINVCOMP-43) Search/Facets: Display error toast message for 414 code and when request URL limit is exceeded.
- [UISINVCOMP-48](https://issues.folio.org/browse/UISINVCOMP-48) *BREAKING* Update facets endpoint and params for Call Numbers browse facets.
- [UISINVCOMP-51](https://issues.folio.org/browse/UISINVCOMP-51) *BREAKING* migrate react-intl to v7.
- [UISINVCOMP-52](https://issues.folio.org/browse/UISINVCOMP-52) *BREAKING* migrate stripes dependencies to their Sunflower versions.
- [UISINVCOMP-56](https://issues.folio.org/browse/UISINVCOMP-56) Change the value of the `facet` query parameter for the `Shared` and `Held by` facets for call numbers.

## [1.0.1] (https://github.com/folio-org/stripes-inventory-components/tree/v1.0.1) (2024-12-02)

- [UISINVCOMP-41](https://issues.folio.org/browse/UISINVCOMP-41) Add `qindex` to `queryKey` for `useQuery` facets to avoid getting the cached value for different search options.
- [UISINVCOMP-42](https://issues.folio.org/browse/UISINVCOMP-42) Fetch all options for MultiSelect facets.

## [1.0.0] (https://github.com/folio-org/stripes-inventory-components/tree/v1.0.0) (2024-10-31)

- [UISINVCOMP-1](https://issues.folio.org/browse/UISINVCOMP-1) Prepare the module for use.
- [UISINVCOMP-4](https://issues.folio.org/browse/UISINVCOMP-4) Move AdvancedSearch utility to stripes-inventory-components module.
- [UISINVCOMP-2](https://issues.folio.org/browse/UISINVCOMP-2) Move search and facets functionality into this module to be used by both ui-inventory and ui-plugin-find-instance.
- [UISINVCOMP-5](https://issues.folio.org/browse/UISINVCOMP-5) Rewrite facets functionality (useFacets, withFacets).
- [UISINVCOMP-6](https://issues.folio.org/browse/UISINVCOMP-6) Don't add `typeId` param to facets when Classification Browse doesn't have assigned types
- [UISINVCOMP-3](https://issues.folio.org/browse/UISINVCOMP-3) Replace `moment` library with `dayjs` for the `DateRange` filter.
- [UISINVCOMP-7](https://issues.folio.org/browse/UISINVCOMP-7) Add `buildSearchQuery` compatible with `ui-inventory` and `ui-plugin-find-instance`; add filter components.
- [UISINVCOMP-8](https://issues.folio.org/browse/UISINVCOMP-8) Provide tenant name in parentheses for locations if location name is not unique.
- [UISINVCOMP-9](https://issues.folio.org/browse/UISINVCOMP-9) Use consolidated locations endpoint in member tenants.
- [UISINVCOMP-10](https://issues.folio.org/browse/UISINVCOMP-10) Add "Place of publication" search option.
- [UISINVCOMP-11](https://issues.folio.org/browse/UISINVCOMP-11) Add "Place of publication" search option to Advanced Search.
- [UISINVCOMP-12](https://issues.folio.org/browse/UISINVCOMP-12) Add `holdingsId` to the `holdingIndexes` to display the `Holdings UUID` search option.
- [UISINVCOMP-12](https://issues.folio.org/browse/UISINVCOMP-13) Add `withSearchErrors` to display error messages related to exceeding the request URL limit.
- [UISINVCOMP-15](https://folio-org.atlassian.net/browse/UISINVCOMP-15) ECS - Accept `tenantId` prop to search entries in the specified tenant for supporting `ui-plugin-find-instance` plugin.
- [UISINVCOMP-14](https://issues.folio.org/browse/UISINVCOMP-14) Fix operators for Advanced Search Contributors search.
- [UISINVCOMP-16](https://issues.folio.org/browse/UISINVCOMP-16) Add search segment change handling.
- [UISINVCOMP-17](https://issues.folio.org/browse/UISINVCOMP-17) Create `useDisplaySettingsQuery` and add it to the `useCommonData` hook; add optional `settings` okapi interface.
- [UISINVCOMP-19](https://issues.folio.org/browse/UISINVCOMP-19) Create `useInstanceDateTypes` and add it to the `useCommonData` hook.
- [UISINVCOMP-18](https://issues.folio.org/browse/UISINVCOMP-18) Add search results list constants.
- [UISINVCOMP-20](https://issues.folio.org/browse/UISINVCOMP-20) Make date range filters work with just a single from/to date
- [UISINVCOMP-21](https://issues.folio.org/browse/UISINVCOMP-21) Add Date constants.
- [UISINVCOMP-22](https://issues.folio.org/browse/UISINVCOMP-22) Add "Date range" filter.
- [UISINVCOMP-27](https://issues.folio.org/browse/UISINVCOMP-27) Fix failed unit tests.
- [UISINVCOMP-26](https://issues.folio.org/browse/UISINVCOMP-26) Add filters for subject source and type to Inventory subject browse.
- [UISINVCOMP-28](https://issues.folio.org/browse/UISINVCOMP-28) Date filters: Clear dates after pressing the reset search button.
- [UISINVCOMP-29](https://issues.folio.org/browse/UISINVCOMP-29) Fix `<DateRangeFilter>` validation errors disappear when another facet value changes.
- [UISINVCOMP-32](https://folio-org.atlassian.net/browse/UISINVCOMP-32) Suppress "Shared" facet when user moves holdings/items to another instance.
- [UISINVCOMP-30](https://issues.folio.org/browse/UISINVCOMP-30) Refactor ui-inventory permissions.
- [UISINVCOMP-37](https://issues.folio.org/browse/UISINVCOMP-37) Browse | Number of titles in Subject browse results does not match the number of instances returned in search.
- [UISINVCOMP-33](https://folio-org.atlassian.net/browse/UISINVCOMP-33) If a query template is undefined - return null and don't perform a request.
- [UISINVCOMP-36](https://issues.folio.org/browse/UISINVCOMP-36) Escape advanced search query.
- [UISINVCOMP-39](https://issues.folio.org/browse/UISINVCOMP-39) Rename ui-inventory.display-settings settings scope name.
