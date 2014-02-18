/**
 * ChangeOrgApiUser Interface
 *
 * Provides an interface for users on Change.org.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md
 *
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiUser=function(client) {

	/* @var _callback function */
	this._callback=null;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	this._endpoints=[
		'/v1/users/:user_id',						// get
		'/v1/users/:user_id/petitions',				// getPetitions
		'/v1/users/:user_id/signatures/petitions',	// getSignedPetitions
		'/v1/users/get_id'							// getId
	];

	/**
	 * Get default request options.
	 *
	 * @todo Future use.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {};
	};

	/**
	 * Get the stored client instance.
	 * 
	 * @return ChangeOrgApiClient
	 */
	this.getClient=function() {
		return this._client;
	};

	/**
	 * Get the prepared endpoint for a requested resource.
	 * 
	 * @param number index
	 * @param mixed data
	 * @return string
	 */
	this.getEndpoint=function(index,data) {
		if(typeof this._endpoints[index]=='undefined')
			return false;

		return ChangeOrgApiUtils.bind(this._endpoints[index],data);
	};

	/**
	 * Returns information about the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_id
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.get=function(data,callback) {
		if(typeof data=='number')
			data={user_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(0,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns the unique Change.org ID for the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersget_id
	 * 
	 * @param string|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.getId=function(data,callback) {
		if(typeof data=='string')
			data={user_url:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(3,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns the array of petitions that were created by the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_idpetitions
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.getPetitions=function(data,callback) {
		if(typeof data=='number')
			data={user_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(1,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns the array of petitions that were signed by the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_idsignaturespetitions
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.getSignedPetitions=function(data,callback) {
		if(typeof data=='number')
			data={user_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(2,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Set the request callback.
	 * 
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.setCallback=function(callback) {
		this._callback=callback;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient client
	 * @return ChangeOrgApiPetition
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	if(client)
		this.setClient(client);
};