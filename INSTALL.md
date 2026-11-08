# Panel installation

Copy the generated HTML file to the panel host. For Docker, the configured path must be readable inside the container. Keep the theme folder outside any public static directory.

## PasarGuard

Source reference [v5.6.0](https://github.com/PasarGuard/panel/tree/2b75db15cb0019a00252c59f9d1c34e6082a121f).

1. Copy `themes/pasarguard/index.html` to `/var/lib/pasarguard/templates/rtl-subscription/index.html`. The default Compose setup already mounts `/var/lib/pasarguard`.
2. Set these variables in the panel's `.env`. If you already have a custom template directory, put `rtl-subscription/index.html` under that directory and keep its existing setting.

   ```dotenv
   CUSTOM_TEMPLATES_DIRECTORY=/var/lib/pasarguard/templates
   SUBSCRIPTION_PAGE_TEMPLATE=rtl-subscription/index.html
   ```

3. In a Compose install, run `docker compose up -d` from the panel's Compose directory to apply environment changes. For a native install, restart the panel service with its updated environment.
4. Keep the subscription browser page enabled. For the format buttons, enable manual `clash_meta` and `xray` subscriptions in the panel. The browser template context lacks those toggles. If you disable either format, set the corresponding URL to `""` in `adapters/pasarguard.js`, rebuild and redeploy. To enable the support button, set `supportUrl` in the same adapter.
5. Open a test user's normal subscription URL in a browser. An admin-level subscription template overrides the default. Set that admin's template to `rtl-subscription/index.html` or clear the override.

Config rows follow the links the panel provides. PasarGuard may withhold them under its browser-config or HWID settings.

To roll back, restore the previous template settings and reapply the panel environment.

## 3x-ui

Requires a build with **Sub Theme Directory**. Source reference [v3.11.0](https://github.com/MHSanaei/3x-ui/tree/v3.11.0). See the [upstream template guide](https://github.com/MHSanaei/3x-ui/blob/v3.11.0/docs/custom-subscription-templates.md).

1. Copy `themes/3x-ui/sub.html` to `/etc/3x-ui/sub_templates/rtl-subscription/sub.html`. With Docker, bind-mount the folder read-only and use its container path in the next step.
2. In **Settings → Subscription → Information**, set **Sub Theme Directory** to `/etc/3x-ui/sub_templates/rtl-subscription/` and save.
3. Open a test user's subscription link in a browser. The panel supplies the JSON, Clash and support URLs when configured.

To roll back, restore the previous theme directory or clear the field for the built-in page.

## After installing

Check the page in a browser and import the same subscription link in a client. Verify traffic, expiry and copied URLs with a test account. Keep subscription URLs and real config links out of public commits, screenshots and GitHub Pages. Publish only `docs/` as the demo. When using a reverse proxy, exclude subscription routes from caching.
