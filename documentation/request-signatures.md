#Request Signatures

According to [Change.org docs](https://github.com/change/api_docs/blob/master/v1/documentation/requests.md#request-signature), certain requests must be signed with a SHA-2 digest of the request body. Some requests must include an authorization key, while all signed requests require at least an API secret key. Thankfully, this will be handled for you.

Each interface resource has been tailored to manage your signatures. Your job is to supply the `ChangeOrgApiClient` object and set the authorization key as needed.

As an example, see the `ChangeOrgApiPetition` interface. The resource we will use is `getUpdates`.

```javascript
var petition=new ChangeOrgApiPetition(client);

petition.getUpdates(12345678);
```

We've supplied the client and a petition ID by which we will acquire news updates. The rest of the parameters are set automatically:

```javascript
this.getUpdates=function(data,callback) {
	var request=new ChangeOrgApiRequest(this.getClient())
		.setMethod('GET')
		.addData(data)
		.setEndpoint(this.getEndpoint(5,data))
		.setSignatureRequiredFlag(false)
		;

	if(callback)
		request.setOnSuccess(callback);
	else if(this._callback)
		request.setOnSuccess(this._callback);

	request.send();
};
```

According to the documentation for [petition updates](https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/updates.md#updates-on-petitions), we don't need to sign the request. For this reason, you will see the call to `setSignatureRequiredFlag(false)` on the request. Then, the request method and endpoint are set for you.

If the resource you are trying to use requires an authorization key, then you must provide it to ensure a valid request signature. This can be seen in the `ChangeOrgApiPetition` interface when using the `addSignature` resource:

```javascript
var petition=new ChangeOrgApiPetition(client);

petition.addSignature({
	petition_id 	: '1234567',
	auth_key 		: 'MY_PETITION_AUTH_KEY',
	source 			: 'https://www.myblog.com/sign-the-petition',
	email 			: 'requester@gmail.com',
	first_name 		: 'John',
	last_name 		: 'Doe',
	address 		: '123 Any St.',
	city 			: 'Beverly Hillds',
	state_province 	: 'CA',
	postal_code 	: '90210',
	country_code 	: 'US',
	phone 			: '5555555555',
	reason 			: 'I support this petition!'
});
```