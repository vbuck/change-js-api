#ChangeOrgApiPetition.getReasons

Returns the reasons given by signers of a petition for having signed.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/reasons.md#get-petitionspetition_idreasons]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.getReasons(1234567,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"reasons":[...]}
```