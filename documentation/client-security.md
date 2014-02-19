#Client Security

As being built on JavaScript, this library brings most of the work to the front-end. As a result, this can present a security risk by exposing both your Change.org API developer public and secret keys. This is illustrated in the construction of a `ChangeOrgApiClient` object:

```javascript
var client=new ChangeOrgApiClient({
	api_key		: 'YOUR_API_KEY',
	secret_key	: 'YOUR_SECRET_KEY' 
});
```

The secret key is used to sign your requests. By exposing this key, you run the risk of others being able to sign requests as if they were you. However, there are a few important things to consider.

1. Secret keys are optional
   Not every Change.org API resource requires a signed request using a secret key. In fact, most requests require only a public API key. Therefore, you have the option to omit this parameter.

2. I need a pure JavaScript solution
   In this case, you would have to expose the secret key. But there are places where this practice presents a lower security risk. For example, when using obfuscated code, it would be relatively difficult to obtain the key.

3. Secret keys can come from the server
   Lastly, if you choose to omit your secret key, the request signing can be deferred to a [specified proxy server](/documentation/proxy-script.md). In this case, you must set the `ChangeOrgApiUtils.proxy` value to the URL of your proxy script. Submitting your request on a resource would send the data to the proxy, where to it the secret key would be appended, and the request body would be signed.