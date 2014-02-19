#ChangeOrgApiPetition.getSignatures

Returns signatures on a petition.

Reference: [https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#get-petitionspetition_idsignatures]

Example
------
```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.getSignatures(1234567,function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"signature_count":2,"signatures":[...]}
```

In another example, you can specify paging options:

```javascript
petition.getSignatures({
	petition_id 	: 7654321,
	page_size 		: 50,
	page 			: 1,
	sort 			: 'time_desc'
},function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":...,"total_pages":2,"signature_count":72,"signatures":[...]}
```