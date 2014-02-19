#ChangeOrgApiOrganization.getId

Returns the unique Change.org ID for the specified organization.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md#get-organizationsget_id]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var organization=new ChangeOrgApiOrganization(client);

organization.getId('http://www.change.org/organizations/joe_schmoe_inc',function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"result":"success","organization_id":123456}
```