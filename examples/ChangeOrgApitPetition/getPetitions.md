#ChangeOrgApiPetition.getPetitions

Returns the array of petition data objects corresponding to the petition IDs submitted.
Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitions]

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

petition.getPetitions({
	petition_ids: '1234567,7654321',
	fields: 'title'
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"petitions":[{"title":"A Petition to Petition"},{"title":"Save the Clock Tower!"}]} 
```