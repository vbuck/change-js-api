/**
 * ChangeOrgApiPetition Interface
 *
 * Provides an interface for petitions on Change.org.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiPetition=function(client) {

	/* @var _authorization ChangeOrgApiAuthorization */
	this._authorization=null;
	/* @var _callback function */
	this._callback=null;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	this._endpoints=[
		'/v1/petitions/:petition_id/signatures',			// addSignature
		'/v1/petitions/:petition_id/signatures',			// getSignatures
		'/v1/petitions/:petition_id/signatures/recent',		// getRecentSignatures
		'/v1/petitions/:petition_id/targets',				// getTargets
		'/v1/petitions/:petition_id/reasons',				// getReasons
		'/v1/petitions/:petition_id/updates',				// getUpdates
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
	 * Adds a signature to a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#post-signatures
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.addSignature=function(data,callback) {
		if(typeof data.auth_key=='undefined')
			throw new ChangeOrgApiException('An authorization key is required to sign a petition.');

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('POST')
			.addData(data)
			.setEndpoint(this.getEndpoint(0,data))
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Get a petition authorization instance.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md
	 * 
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.getAuthorization=function() {
		if(!this._authorization) {
			this._authorization=new ChangeOrgApiPetitionAuthorization(this._client);
		}

		return this._authorization;
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
	 * Returns signatures on a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#signatures-on-petitions
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getSignatures=function(data,callback) {
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

		return this;
	};

	/**
	 * Returns an array of the 10 most recent signatures on a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#get-signatures-recent
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getRecentSignatures=function(data,callback) {
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
	 * Returns the reasons given by signers of a petition for having signed.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/reasons.md
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getReasons=function(data,callback) {
		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(4,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the target(s) of a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/targets.md
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getTargets=function(data,callback) {
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

		return this;
	};

	/**
	 * Returns the news updates on a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/updates.md
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getUpdates=function(data,callback) {
		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(5,data))
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
	 * @return ChangeOrgApiPetition
	 */
	this.setCallback=function(callback) {
		this._callback=callback;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient client
	 * @return ChangeOrgApiUser
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