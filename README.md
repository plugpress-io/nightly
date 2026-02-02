# Nightly Plugin Scaffold

A copy-friendly WordPress plugin scaffold with a REST-powered React admin app, Tailwind, and shadcn/ui-style components.

## Scaffold Structure

```
nightly/
├─ assets/
│  ├─ icons/
│  ├─ images/
│  └─ screenshots/
├─ build/
│  └─ admin/
├─ includes/
├─ src/
│  └─ admin/
├─ nightly.php
├─ uninstall.php
├─ package.json
├─ webpack.config.js
├─ tailwind.config.js
└─ postcss.config.js
```

## Install & Build

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the admin app (outputs to `build/admin`):

   ```bash
   npm run build
   ```

3. During development, use:

   ```bash
   npm run start
   ```

## Add New REST Endpoints

1. Register a route in `includes/rest.php` using the `nightly/v1` namespace.
2. Add permission checks with `Permissions::can_manage()` or custom callbacks in `includes/permissions.php`.
3. Sanitize request input in `includes/sanitize.php` and store values via `includes/options.php`.
4. Update the API client in `src/admin/api/endpoints.ts`.

## Add New Admin Pages & Components

1. Create a page component under `src/admin/pages/`.
2. Register it in `src/admin/router.tsx`.
3. Add shared UI primitives in `src/admin/components/ui/` and layout primitives in `src/admin/components/layout/`.
4. Tailwind styles live in `src/admin/styles/tailwind.css` and use `cn()` from `src/admin/lib/utils.ts`.

## Notes

- The admin app uses the REST API exclusively; PHP renders only the root div.
- Review notices are dismissible and only appear on the dashboard or plugin page.
- Tailwind uses class-based dark mode (`.dark`).
