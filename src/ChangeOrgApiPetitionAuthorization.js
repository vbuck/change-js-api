/**
 * ChangeOrgApiPetitionAuthorization Interface
 *
 * Provides an interface for petition authorization on Change.org.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiPetitionAuthorization=function(client) {

	/* @var _authorizationCallback function */
	this._authorizationCallback=ChangeOrgApiUtils.lambda;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	/* @var _client ChangeOrgApiConnection */
	this._connection=null;
	this._data={};
	this._endpoint='/v1/petitions/:petition_id/auth_keys';
	this._petition_id='';

	/**
	 * Get default request options.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {
			callback_endpoint 	: '',
			requester_email 	: '',
			source 				: '',
			source_description 	: ''
		};
	};

	/**
	 * Sends a request for a petition authorization key on behalf of an individual.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md#post-petitionspetition_idauth_keys
	 * 
	 * @param function callback
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.authorize=function(callback) {
		this.setCallback(callback);

		var request=new ChangeOrgApiRequest(this._client);

		request.addData(this._data)
			.setMethod('POST')
			.setEndpoint(ChangeOrgApiUtils.bind(this._endpoint,this._petition_id))
			.setSignatureAuthKeyRequiredFlag(false)
			.setOnSuccess(this._authorizationCallback)
			;

		request.send();

		return this;
	};

	/**
	 * Get the request callback endpoint.
	 * 
	 * @return string
	 */
	this.getCallbackEndpoint=function() {
		return this._data.callback_endpoint;
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
	 * Get the request endpoint.
	 * 
	 * @param object data
	 * @return string
	 */
	this.getEndpoint=function(data) {
		return ChangeOrgApiUtils.bind(this._endpoint,data);
	};

	/**
	 * Get the requester.
	 * 
	 * @return string
	 */
	this.getRequesterEmail=function() {
		return this._data.requester_email;
	};

	/**
	 * Get the request source.
	 * 
	 * @return string
	 */
	this.getSource=function() {
		return this._data.source;
	};

	/**
	 * Get the request source description.
	 * 
	 * @return string
	 */
	this.getSourceDescription=function() {
		return this._data.source_description;
	};

	/**
	 * Set the request callback.
	 * 
	 * @param function callback
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setCallback=function(callback) {
		if(typeof callback=='function')
			this._authorizationCallback=callback;

		return this;
	};

	/**
	 * Set the request callback endpoint.
	 * 
	 * @param string endpoint
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setCallbackEndpoint=function(endpoint) {
		this._data.callback_endpoint=endpoint;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Set the petition ID.
	 * 
	 * @param number id
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setPetitionId=function(id) {
		this._petition_id=id;
		
		return this;
	};

	/**
	 * Set the requester.
	 * 
	 * @param string email.
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setRequesterEmail=function(email) {
		this._data.requester_email=email;

		return this;
	};

	/**
	 * Set the request source.
	 * 
	 * @param string source
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setSource=function(source) {
		this._data.source=source;

		return this;
	};

	/**
	 * Set the request source description.
	 * 
	 * @param string description
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setSourceDescription=function(description) {
		this._data.source_description=description;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	this._data=this._getDefaults();

 	if(client)
 		this.setClient(client);

};