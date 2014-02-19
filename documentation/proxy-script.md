#Making Proxied Requests

In some circumstances, you may prefer or need to proxy your Change.org API request.

When to Proxy a Request
------

1. Your application prohibits non-CORS requests.
2. You do not want to expose your secret key.
3. You want to impose additional restrictions on your request.

For these reasons, a proxy class is provided, `ChangeOrgApiProxy`. This static class can be dropped in a folder, along with the companion `index.php`:

```php
<?php

require_once 'ChangeOrgApiProxy.php';

ChangeOrgApiProxy::setSecretKey('YOUR_SECRET_KEY');

if(ChangeOrgApiProxy::validate($_GET)) {
        echo ChangeOrgApiProxy::fetch($_GET);
}
```

When making a proxied request, the front-end will always pass your request body as a `GET` parameter. The `ChangeOrgApiProxy` class will break it down and re-construct it for use in a cURL request. The result is returned and parsed on the front-end as a `ChangeOrgApiResponse` object.

Configuring the Front-End for Proxied Requests
------

To use the proxy script, configure your front-end to point to it.

```javascript
ChangeOrgApiUtils.proxy='http://url.to/your/proxy/script/';
```

This must be done before making any requests.

Google Chrome Extensions
------

If you are using this library in a Google Chrome extension, you do not need the proxy script. Chrome can bypass cross-origin restrictions as long as you provide adequate permissions in your request.

Built for CORS
------

The `ChangeOrgApiProxy` class is designed as a solution to the problem presented by the Change.org API server omitting a `Access-Control-Allow-Origin` header. If they ever do implement CORS, you can stop using the proxy by clearing or else not setting `ChangeOrgApiUtils.proxy` on the front-end, and it will default to using an `XMLHttpRequest` object for communicating directly with their server.
