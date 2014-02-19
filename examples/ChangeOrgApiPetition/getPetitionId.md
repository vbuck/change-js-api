#ChangeOrgApiPetition.getPetitionId

Returns the unique Change.org ID for the petition specified by petition_url. Before performing requests on a petition, the unique Change.org ID is required because petition URLs can change.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitionsget_id]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.getPetitionId('http://www.change.org/petitions/save-the-clock-tower',function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"result":"success","petition_id":1234567} 
```