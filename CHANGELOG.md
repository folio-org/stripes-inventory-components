# Change history for stripes-inventory-components

## 1.0.0 IN PROGRESS

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
