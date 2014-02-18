# The ChangeOrgApiResponse Object

A response object contains the parsed response (JSON object) from the Change.org API request. You can retrieve the entire object or a specific value. See the example below.

```javascript
var response=new ChangeOrgApiResponse();

response.setData({
	status 	: 1,
	name 	: 'Joe Schmoe'
});

console.log(JSON.stringify(response.getData()));
// {"status":1,"name":"Joe Schmoe"}

console.log(response.getData('name'));
// Joe Schmoe
```
