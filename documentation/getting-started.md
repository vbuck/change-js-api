#Getting Started

1. __Load the required libraries__

   ```xml
   <script type="text/javascript" src="./ChangeOrgApi/sha256.js"></script>
   <script type="text/javascript" src="./ChangeOrgApi/changeorgapi.min.js"></script>
   ```
   `sha256.js` is a third-party library provided by [Jeff Mott](https://code.google.com/p/crypto-js/). It is used to sign your requests using SHA-2 encryption. Learn more about [request signatures](/documentation/request-signatures.md).

2. __Select your API.__

   Available interfaces include [Petitions](/documentation/interfaces.md#changeorgapipetition), [Users](/documentation/interfaces.md#changeorgapiuer), and [Organizations](/documentation/interfaces.md#changeorgapiorganization).
   
   In this example, we will be adding a signature to a petition.
   
   ```javascript
   var client=new ChangeOrgApiClient({
       api_key  : 'YOUR_PUBLIC_API_KEY',
       secret 	: 'YOUR_SECRET_KEY'
   });
   
   var petition=new ChangeOrgApiPetition(client);	
   ```
   
   Every interface requires a `ChangeOrgApiClient` object, which contains your API developer credentials.
   
   If you don't want to expose your keys, then read more about [securing your client](/documentation/client-security.md).

3. __Set your callback.__

   A callback is triggered when the API request completes:
   
   ```javascript
   petition.setCallback(function(response) {
       alert(response.getData('result'));
   });	
   ```
   
   Every interface lets you specify a callback with `setCallback`. It receives a `ChangeOrgApiResponse` object. You can learn more about the [response object](/documentation/response-object.md).

4. __Make your request.__

   Depending on the type of request, you might write something like this:
   
   ```javascript
   petition.addSignature({
       petition_id 		: 'YOUR_PETITION_ID',
       auth_key 		: 'YOUR_AUTH_KEY',
       source 			: 'http://www.myblog.com/sign-the-petition/',
       email 			: 'johndoe@gmail.com',
       first_name 		: 'John',
       last_name 		: 'Doe',
       address 			: '123 Any St.',
       city 			: 'Beverly Hills',
       state_province 	: 'CA',
       postal_code 		: '90210',
       country_code 	: 'US',
       phone 			: '5555555555',
       reason 			: 'I support this petition',
       hidden 			: false
   });
   ```
   
   In this example, we are adding a signature to the specified petition.

Summary
------
Nearly every type of request you make to interact with Change.org can be done by following these four steps. You can learn more about the provided interfaces [here](/documentation/interfaces.md).