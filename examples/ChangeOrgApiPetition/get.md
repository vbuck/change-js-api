#ChangeOrgApiPetition.get

Returns information about this petition, including the overview, letter to the petition target, URL to the petition image (if available), and signature count.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitionspetition_id]

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

petition.get({
	petition_id: 1234567,
	fields: 'title,url,signature_count'
});

// Console Output:
// {"title":"My Petition","url":"https://api.change.org/petitions/my-petition","signature_count":239}
```