#ChangeOrgApiUser.getId

Returns the unique Change.org ID for the specified user.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersget_id]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var user=new ChangeOrgApiUser(client);

user.getId('http://www.change.org/users/12345678',function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"result":"success","user_id":12345678}
```