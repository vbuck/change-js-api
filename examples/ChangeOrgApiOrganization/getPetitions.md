#ChangeOrgApiOrganization.getPetitions

Returns the array of petitions that were created by the specified organization.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md#get-organizationsorganization_idpetitions]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var organization=new ChangeOrgApiOrganization(client);

organization.getPetitions(123456,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"petitions":[...]}
```