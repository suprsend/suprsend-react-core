# Changelog

## 2.0.0

### Added

- Tenant scoping support for multi-tenant workspaces. No changes are needed if your workspace doesn't use multiple tenants.
  - `SuprSendProvider` now accepts a `tenantId` prop that scopes the identified user's events, preferences and feed to that tenant. Its value must match `scope.tenant_id` in the `userToken` payload, else it raises a scoping error.
  - Changing the `tenantId` prop switches the active tenant of the identified user.
  - `tenantId` in `SuprSendFeedProvider` options takes priority over the active tenant set in `SuprSendProvider` (else the `default` tenant) and pins the feed to that tenant. Without it, the feed follows the active tenant on `SuprSendProvider` and re-initializes inbox automatically when it changes.

### Changed

- Upgraded `@suprsend/web-sdk` dependency to `^5.0.0`, which adds the underlying tenant scoping support ([web-sdk changelog](https://github.com/suprsend/suprsend-web-sdk/blob/main/CHANGELOG.md)).

### Notes

- Previously fetched preferences keep the tenant they were fetched with. Call `getPreferences` again after a tenant change to load the new tenant's data.

[2.0.0]: https://github.com/suprsend/suprsend-react-core/compare/v1.2.3...v2.0.0
