# Legacy: dynamic Cordis package (validation stage)

These two files are the Host/Client halves of the **dynamic Cordis plugin**
(`dshlp-1/pkg-1`) built during the validation stage. It registered the phrase
line in the `conversation.composer.dock` slot and hid the shipped status row
via injected CSS.

Superseded by the plain-package client in `lib/client.js`, which renders in
the original status-row position instead. Kept for reference only; the
dynamic plugin itself is stopped and no longer used.
