#ChangeOrgApiPetition.getUpdates

Returns the news updates on a petition.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/updates.md#get-petitionspetition_idupdates]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.getUpdates(1234567,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"updates":[...]}
```