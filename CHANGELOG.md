# Changelog

## 2.3.0

### Added

- `SuprSendFeedProvider` now accepts a `reachability` prop (defaults to `false`). Opt in to know whether the feed is actually working for a user: whether the browser has internet, whether the feed socket is live and whether the client can reach the feed notifications API, combined into an `ONLINE | DEGRADED | OFFLINE | UNKNOWN` status. Read it as react state with `useFeed().reachability`, which is `undefined` when not opted in. [Read more](docs/inbox.md#tracking-reachability).
- Three translation keys for connection-status copy: `connectionIssue`, `offlineMessage` and `reportIssue`. They ship for all five bundled locales and are overridable through `SuprSendI18nProvider` like every other key. `@suprsend/react` uses them to explain a degraded feed in the inbox UI.

### Changed

- Upgraded `@suprsend/web-sdk` dependency to `^5.3.0`, which adds feed reachability tracking ([web-sdk changelog](https://github.com/suprsend/suprsend-web-sdk/blob/main/CHANGELOG.md#530)).

### Fixed

- `useFeed` now throws its documented "must be used within a SuprSendProvider and SuprSendFeedProvider" error when called outside the provider. Its guard compared against `undefined` while the context defaults to `null`, so the error never fired and the hook's return type stayed nullable — which made `const { feedData } = useFeed()` fail to compile under `strict`. Destructuring from `useFeed()` now typechecks.

### Notes

- Reachability is off by default and adds no network requests or timers, so no integration changes are needed.
- The `reachability` prop is read only when the feed instance is created. Toggling it later has no effect, matching the existing behaviour of `stores`, `host` and `pageSize`.
- The web-sdk upgrade also makes every feed acknowledge realtime notification events back to the server over the existing socket. This is not gated by the `reachability` prop and has no react-core API surface, but it ships for all consumers on this version.

[2.3.0]: https://github.com/suprsend/suprsend-react-core/compare/v2.2.0...v2.3.0

## 2.2.0

### Added

- `SuprSendProvider` now accepts a `pushTokenActionOnTenantChange` prop (`'none' | 'copy' | 'move'`, defaults to `'none'`). It controls what happens to the existing webpush subscription when the `tenantId` prop changes: `copy` attaches it to the new tenant as well, `move` detaches it from the current tenant and attaches it to the new tenant. If the device has no push subscription, the tenant switch still succeeds. No changes are needed if you don't use webpush with multiple tenants.
- `SuprSendProvider` now accepts a `tenantChangeHandler` callback, invoked with the `changeTenant` response whenever a `tenantId` prop change switches the active tenant of the identified user. Use it to detect a failed switch, in which case the previous tenant stays active.

### Changed

- Upgraded `@suprsend/web-sdk` dependency to `^5.2.0`, which adds the `pushTokenAction` option to `changeTenant` ([web-sdk changelog](https://github.com/suprsend/suprsend-web-sdk/blob/main/CHANGELOG.md#520)).

[2.2.0]: https://github.com/suprsend/suprsend-react-core/compare/v2.1.0...v2.2.0

## 2.1.0

### Changed

- Upgraded `@suprsend/web-sdk` dependency to `^5.1.0`. The changes in this release come from the web-sdk, see the [web-sdk 5.1.0 changelog](https://github.com/suprsend/suprsend-web-sdk/blob/main/CHANGELOG.md#510) for details:

### Notes

- No integration changes are needed.

[2.1.0]: https://github.com/suprsend/suprsend-react-core/compare/v2.0.0...v2.1.0

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
