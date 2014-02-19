#ChangeOrgApiUser.get

Returns information about the specified user.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_id]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var user=new ChangeOrgApiUser(client);

user.get(79853981,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"user_id":12345678,"name":"John Doe","location":"...","city":"...","state_province":"...","country_name":"...","country_code":"..."}
```