#ChangeOrgApiPetition.getTargets

Returns the target(s) of a petition.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/targets.md#targets-on-petitions]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.getTargets(1234567,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// [{"name":"The Government of the United States of America","type":"custom"}]
```