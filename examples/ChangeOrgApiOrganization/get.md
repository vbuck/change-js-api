#ChangeOrgApiOrganization.get

Returns information about the specified organization.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md#get-organizationsorganization_id]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var organization=new ChangeOrgApiOrganization(client);

organization.get(123456,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"organization_id":123456,"name":"Joe Schmoe, Inc.",...} 
```