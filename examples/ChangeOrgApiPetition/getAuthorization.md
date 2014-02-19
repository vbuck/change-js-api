#ChangeOrgApiPetition.getAuthorization

Obtain an authorization key for use when signing petitions. This is a convenience method for accessing the `ChangeOrgApiPetitionAuthorization` interface.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md]

Example
------

In this example, we will obtain an authorization key for use in signing the petition.

```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);
var auth=petition.getAuthorization();

auth.setPetitionId(1234567)
	.setRequesterEmail('requester@gmail.com')
	.setSource('http://www.myblog.com/sign-the-petition')
	.setSourceDescription('My Blog')
	.setCallback(function(response) {

		console.log(JSON.stringify(response.getData()));

		if(response.getData('status')=='granted') {
			petition.addSignature({
				petition_id 	: 1234567,
				auth_key 		: response.getData('auth_key'),
				source 			: 'http://www.myblog.com/sign-the-petition',
				email 			: 'requester@gmail.com',
				first_name 		: 'John',
				last_name 		: 'Doe',
				address 		: '123 Any St.',
				city 			: 'Beverly Hills',
				state_province 	: 'CA',
				postal_code 	: '90210',
				country_code 	: 'US',
				phone 			: '5555555555',
				reason 			: 'I support this petition!',
				hidden 			: true
			},function(response) {
				console.log(JSON.stringify(response.getData()));
			});
		}

	});

auth.authorize();

// Console Output:
// {"auth_key":"YOUR_AUTH_KEY","petition_id":1234567,"requester_email":"...","source":"...","source_description":"...","status":"granted","result":"success"}
// {"result":"failure","messages":["user has already signed the petition"]}
```

The above example assumes that the authorization key has already been generated before or will be available immediately. However, the authorization key may not always be available. Please continue reading for more information about this.

Using a Callback Endpoint
------
According to Change.org, you need to pass a `callback_endpoint` parameter along with your authorization request. This is because authorization keys are generated asynchronously to your request. Therefore, when the key is ready, it will be posted back to your given endpoint. In this case, it is up to you to listen for that response and make the authorization key available to your application as it becomes available.

Sending a Follow-Up Request
------
As an alternative, you can attempt to "double-post" your authorization request with the `_doFollowup` flag. This is done by calling `setFollowupFlag(true)` on your request. By setting this flag to `TRUE` you will cause a duplicate request to be submitted with the hope that your authorization key will be ready. In this case, your callback will not be triggered until the second response is received:

```javascript
var auth=new ChangeOrgApiPetitionAuthoriation(client);

auth.setPetitionId(1234567)
	.setRequesterEmail('requester@gmail.com')
	.setSource('http://www.myblog.com/sign-the-petition')
	.setSourceDescription('My Blog')
	.setFollowupFlag(true)
	.setCallback(function(response) {
		alert(response.getData('auth_key'));
	});
```

Why do something seemingly "hackish?" Well, according to [this post](https://groups.google.com/d/msg/change-org-api/LLlxZAIGtQc/htPSwtWSLq4J) by Alain Bloch, a second request using the same source and API key should successfully return the generated authorization key. It is for this reason that the `_doFollowup` flag has been provided.