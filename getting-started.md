#Getting Started

1. Load the required libraries

```xml
<script type="text/javascript" src="./ChangeOrgApi/sha256.js"></script>
<script type="text/javascript" src="./ChangeOrgApi/changeorgapi.min.js"></script>
```
`sha256.js` is a third-party library provided by [Jeff Mott](https://code.google.com/p/crypto-js/). It is used to sign your requests using SHA-2 encryption. Learn more about [request signatures](../blob/master/docs/request-signatures.md).

2. Select your API.

Available interfaces include [Petitions](../blob/master/src/ChangeOrgApiPetition.js),[Users](../blob/master/src/ChangeOrgApiUser.js), and [Organizations](../blob/master/src/ChangeOrgApiOrganization).

In this example, we will be adding a signature to a petition.

```javascript
var client=new ChangeOrgApiClient({
	api_key : 'YOUR_PUBLIC_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);	
```

Every interface requires a `ChangeOrgApiClient` object, which contains your API developer credentials.

If you don't want to expose your keys, then read more about [securing your client](../blob/master/docs/client-security.md).

3. Set your callback.

A callback is triggered when the API request completes:

```javascript
petition.setCallback(function(response) {
	alert(response.getData('result'));
});	
```

Every interface lets you specify a callback with `setCallback`. It receives a `ChangeOrgApiResponse` object. You can learn more about the [response object](../blob/master/docs/response-objects.md).

4. Make your request.

Depending on the type of request, you might write something like this:

```javascript
petition.addSignature({
	petition_id 		: 'YOUR_PETITION_ID',
	auth_key 		: 'YOUR_AUTH_KEY',
	source 			: 'http://www.myblog.com/sign-the-petition/',
	email 			: 'johndoe@gmail.com',
	first_name 		: 'John',
	last_name 		: 'Doe',
	address 		: '123 Any St.',
	city 			: 'Beverly Hills',
	state_province 		: 'CA',
	postal_code 		: '90210',
	country_code 		: 'US',
	phone 			: '5555555555',
	reason 			: 'I support this petition',
	hidden 			: false
});
```

In this example, we are adding a signature to the specified petition.

Summary
------
Nearly every type of request you make to interact with Change.org can be done by following these four steps. You can learn more about the provided interfaces [here](../blob/master/docs/interfaces.md).
