#ChangeOrgApiUser.getPetitions

Returns the array of petitions that were created by the specified user.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_idpetitions]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var user=new ChangeOrgApiUser(client);

user.setCallback(function(response) {
	console.log(JSON.stringify(response.getData()));
});

user.getPetitions({
	user_id 	: 12345678,
	fields 		: 'title,url,signature_count',
	page_size 	: 5,
	page 		: 1,
	sort 		: 'signatures_asc'
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"petitions":[...]}
```