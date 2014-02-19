#ChangeOrgApiUser.getSignedPetitions

Returns the array of petitions that were signed by the specified user. Signatures that are hidden by the user will not be returned.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_idsignaturespetitions]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var user=new ChangeOrgApiUser(client);

user.getSignedPetitions({
	user_id 	: 12345678,
	fields 		: 'title,url,signature_count',
	page_size 	: 5,
	page 		: 1,
	sort 		: 'time_desc'
},function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"petitions":[...]}
```