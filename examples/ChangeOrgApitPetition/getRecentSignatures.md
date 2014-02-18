#ChangeOrgApiPetition.getRecentSignatures

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

petition.getRecentSignatures(1234567,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// [{"name":"John Doe","city":"BEVERLY HILLS","state_province":"CA","country_code":"US","country_name":"United States","signed_at":"2014-02-17T20:34:45Z"},{...},...]
```