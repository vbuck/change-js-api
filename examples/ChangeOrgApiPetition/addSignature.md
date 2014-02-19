#ChangeOrgApiPetition.addSignature

Returns an array of the 10 most recent signatures on a petition.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#get-petitionspetition_idsignaturesrecent]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.setCallback(function(response) {
	console.log(JSON.stringify(response.getData()));
});

petition.addSignature({
	petition_id 	: '1234567',
	auth_key 		: 'YOUR_AUTH_KEY',
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
});

// Console Output:
// {"result":"failure","messages":["user has already signed the petition"]}
```

Getting an Auth Key
------
In order to sign a petition, an [authorization key](https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md#authorization-keys-on-petitions) must be granted on behalf of an individual. So you will need this key in order to use the `addSignature` resource. See below for an example.

```javascript
var auth=new ChangeOrgApiPetitionAuthorization(client);

auth.setPetitionId('1234567')
	.setRequesterEmail('requester@gmail.com')
	.setSource('http://www.myblog.com/sign-the-petition')
	.setSourceDescription('My Blog')
	.setCallback(function(response) {
		console.log(JSON.stringify(response.getData()));
	});

auth.authorize();

// Console Output:
// {"auth_key":"YOUR_AUTH_KEY","petition_id":1234567,"requester_email":"...","source":"...","source_description":"...","status":"granted","result":"success"} 
```

The above example uses the `ChangeOrgApiPetitionAuthorization` interface. Note that you can also access this interface as a convenience through `ChangeOrgApiPetition.getAuthorization`.

Learn more about how [authorization keys](documentation/getting-auth-keys.md) are acquired.