$(document).ready(function() {
	ChangeOrgApiUtils.proxy='http://www.sproutjs.com/public/change-js-api/';

	var client={
		template: 'var client=new ChangeOrgApiClient({\n\tapi_key : \'%api_key%\',\n\tsecret : \'%secret%\'\n});\n\n'
	};

	var interfaces={
		ChangeOrgApiPetition: {
			getPetitions: {
				description: 'Returns the array of petition data objects corresponding to the petition IDs submitted.',
				endpoint: 'GET petitions',
				parameters: {
					petition_ids: {
						type: 'text',
						className: 'span12 required'
					},
					fields: {
						type: 'text',
						value: 'title,url,signature_count',
						className: 'span12'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['signatures_asc','signatures_asc'],
							['signatures_desc','signatures_desc'],
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var petitions=new ChangeOrgApiPetition(client);\n\npetitions.setCallback(myCallback);\n\npetitions.getPetitions({\n\tpetition_ids : \'%petition_ids%\',\n\tfields: \'%fields%\',\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			},
			get: {
				description: 'Returns information about this petition, including the overview, letter to the petition target, URL to the petition image (if available), and signature count.',
				endpoint: 'GET petitions/:petition_id',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					},
					fields: {
						type: 'text',
						value: 'title,url,signature_count',
						className: 'span12'
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.get({\n\tpetition_id : %petition_id%,\n\tfields: \'%fields%\'\n});'
			},
			getId: {
				description: 'Returns the unique Change.org ID for the petition specified by petition_url. Before performing requests on a petition, the unique Change.org ID is required because petition URLs can change.',
				endpoint: 'GET petitions/get_id',
				parameters: {
					petition_url: {
						type: 'text',
						className: 'span12 required'
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.getId({\n\tpetition_url : \'%petition_url%\'\n});'
			},
			getTargets: {
				description: 'Returns the target(s) of a petition.',
				endpoint: 'GET petitions/:petition_id/targets',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.getTargets({\n\tpetition_id : %petition_id%\n});'
			},
			getSignatures: {
				description: 'Returns signatures on a petition.',
				endpoint: 'GET petitions/:petition_id/signatures',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.getSignatures({\n\tpetition_id : %petition_id%,\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			},
			getRecentSignatures: {
				description: 'Returns an array of the 10 most recent signatures on a petition.',
				endpoint: 'GET petitions/:petition_id/signatures/recent',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.getRecentSignatures({\n\tpetition_id : %petition_id%\n});'
			},
			addSignature: {
				description: 'Adds a signature to a petition. A request signature is required for this request.',
				endpoint: 'POST petitions/:petition_id/signatures',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					},
					auth_key: {
						type: 'text',
						className: 'span12 required'
					},
					source: {
						type: 'text',
						className: 'span12 required'
					},
					email: {
						type: 'text',
						className: 'span12 required'
					},
					first_name: {
						type: 'text',
						className: 'required'
					},
					last_name: {
						type: 'text',
						className: 'required'
					},
					address: {
						type: 'text',
						className: 'span12'
					},
					city: {
						type: 'text',
						className: 'required'
					},
					state_province: {
						type: 'text',
					},
					postal_code: {
						type: 'text',
						className: 'input-mini required'
					},
					country_code: {
						type: 'text',
						className: 'input-mini required'
					},
					phone: {
						type: 'text'
					},
					reason: {
						type: 'textarea',
						className: 'span12'
					},
					hidden: {
						type: 'select',
						options: [
							['true','true'],
							['false','false']
						]
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.addSignature({\n\tpetition_id : %petition_id%,\n\tauth_key : \'%auth_key%\',\n\tsource : \'%source%\',\n\temail : \'%email%\',\n\tfirst_name : \'%first_name%\',\n\tlast_name : \'%last_name%\',\n\taddress : \'%address%\',\n\tcity : \'%city%\',\n\tstate_province : \'%state_province\',\n\tpostal_code : \'%postal_code%\',\n\country_code : \'%country_code%\',\n\tphone : \'%phone%\',\n\treason : \'%reason%\',\n\thidden: %hidden%\n});'
			},
			getReasons: {
				description: 'Returns the reasons given by signers of a petition for having signed.',
				endpoint: 'GET petitions/:petition_id/reasons',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['popularity','popularity'],
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.getReasons({\n\tpetition_id : %petition_id%,\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			},
			getUpdates: {
				description: 'Returns the news updates on a petition.',
				endpoint: 'GET petitions/:petition_id/updates',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var petition=new ChangeOrgApiPetition(client);\n\npetition.setCallback(myCallback);\n\npetition.getUpdates({\n\tpetition_id : %petition_id%,\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			},
			getAuthorization: {
				description: 'Sends a request for a petition authorization key on behalf of an individual.',
				endpoint: 'POST petitions/:petition_id/auth_keys',
				parameters: {
					petition_id: {
						type: 'text',
						className: 'required'
					},
					source_description: {
						type: 'text',
						className: 'span12 required'
					},
					source: {
						type: 'text',
						className: 'span12 required'
					},
					requester_email: {
						type: 'text',
						className: 'span12 required'
					},
					callback_endpoint: {
						type: 'text',
						className: 'span12'
					},
					followup_flag: {
						type: 'select',
						options: [
							['false','false'],
							['true','true']
						]
					}
				},
				template: 'var auth=new ChangeOrgApiPetitionAuthorization(client);\n\nauth.setCallback(myCallback);\n\nauth.setPetitionId(%petition_id%)\n\t.setSourceDescription(\'%source_description%\')\n\t.setSource(\'%source%\')\n\t.setRequesterEmail(\'%requester_email%\')\n\t.setFollowupFlag(%followup_flag%)\n\t.setCallbackEndpoint(\'%callback_endpoint%\');\n\nauth.authorize();'
			}
		},
		ChangeOrgApiUser: {
			get: {
				description: 'Returns information about the specified user.',
				endpoint: 'GET users/:user_id',
				parameters: {
					user_id: {
						type: 'text',
						className: 'required'
					}
				},
				template: 'var user=new ChangeOrgApiUser(client);\n\tuser.setCallback(myCallback);\n\nuser.get({\n\tuser_id : %user_id%\n});'
			},
			getId: {
				description: 'Returns the unique Change.org ID for the user specified by user_url, which is the URL to the user\'s Change.org profile. Before performing requests on a user resource, this ID is required because user profile URLs can change.',
				endpoint: 'GET users/get_id',
				parameters: {
					user_url: {
						type: 'text',
						className: 'span12 required'
					}
				},
				template: 'var user=new ChangeOrgApiUser(client);\n\nuser.setCallback(myCallback);\n\nuser.getId({\n\tuser_url : \'%user_url%\'\n});'
			},
			getPetitions: {
				description: 'Returns the array of petitions that were created by the specified user.',
				endpoint: 'GET users/:user_id/petitions',
				parameters: {
					user_id: {
						type: 'text',
						className: 'required'
					},
					fields: {
						type: 'text',
						value: 'title,url,signature_count',
						className: 'span12'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['signatures_asc','signatures_asc'],
							['signatures_desc','signatures_desc'],
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var user=new ChangeOrgApiUser(client);\n\tuser.setCallback(myCallback);\n\tuser.getPetitions({\n\tuser_id : \'%user_id%\',\n\tfields: \'%fields%\',\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			},
			getSignedPetitions: {
				description: 'Returns the array of petitions that were signed by the specified user. Signatures that are hidden by the user will not be returned.',
				endpoint: 'GET users/:user_id/signatures/petitions',
				parameters: {
					user_id: {
						type: 'text',
						className: 'required'
					},
					fields: {
						type: 'text',
						value: 'title,url,signature_count',
						className: 'span12'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['signatures_asc','signatures_asc'],
							['signatures_desc','signatures_desc'],
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var user=new ChangeOrgApiUser(client);\n\tuser.setCallback(myCallback);\n\tuser.getSignedPetitions({\n\tuser_id : %user_id%,\n\tfields: \'%fields%\',\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			}
		},
		ChangeOrgApiOrganization: {
			get: {
				description: 'Returns information about the specified organization.',
				endpoint: 'GET organizations/:organization_id',
				parameters: {
					organization_id: {
						type: 'text',
						className: 'required'
					}
				},
				template: 'var organization=new ChangeOrgApiOrganization(client);\n\norganization.setCallback(myCallback);\n\norganization.get({\n\torganization_id : %organization_id%\n});'
			},
			getId: {
				description: 'Returns the unique Change.org ID for the organization specified by organization_url, which is the URL to the organization\'s profile on Change.org. Before performing requests on an organization resource, this ID is required because organization profile URLs can change.',
				endpoint: 'GET organizations/get_id',
				parameters: {
					organization_url: {
						type: 'text',
						className: 'span12 required'
					}
				},
				template: 'var organization=new ChangeOrgApiOrganization(client);\n\norganization.setCallback(myCallback);\n\norganization.getId({\n\torganization_url : \'%organization_url%\'\n});'
			},
			getPetitions: {
				description: 'Returns the array of petitions that were created by the specified organization.',
				endpoint: 'GET organizations/:organization_id/petitions',
				parameters: {
					organization_id: {
						type: 'text',
						className: 'required'
					},
					fields: {
						type: 'text',
						value: 'title,url,signature_count',
						className: 'span12'
					},
					page_size: {
						type: 'text',
						className: 'input-mini',
						value: '10'
					},
					page: {
						type: 'text',
						className: 'input-mini',
						value: '1'
					},
					sort: {
						type: 'select',
						options: [
							['signatures_asc','signatures_asc'],
							['signatures_desc','signatures_desc'],
							['time_asc','time_asc'],
							['time_desc','time_desc']
						]
					}
				},
				template: 'var organization=new ChangeOrgApiOrganization(client);\n\torganization.setCallback(myCallback);\n\torganization.getPetitions({\n\torganization_id : %organization_id%,\n\tfields: \'%fields%\',\n\tpage_size : %page_size%,\n\tpage : %page%,\n\tsort : \'%sort%\'\n});'
			}
		}
	};

	var myCallback=function(response) {
		resources.updateLoader(-1);
		$('[data-area="results"]').html(JSON.stringify(response.getData()));
		$('#sandbox_results').removeClass('hidden').get(0).scrollIntoView();
		$('#sandbox_code').get(0).focus();
	};

	var resources={

		_currentResource: '',
		_loaderTimer: 0,

		_buildCode: function(data) {
			if(!data)
				return 'No code available.';

			var template=client.template+data.template;

			for(var key in data.parameters)
				template=template.replace(new RegExp('%'+key+'%','g'),$('#'+key).val());

			template=template.replace(new RegExp('%api_key%','g'),$('#api_key').val());
			template=template.replace(new RegExp('%secret%','g'),$('#secret').val());
			
			return template;
		},

		_buildElement: function(data) {
			if(!data.type)
				return null;

			var typeMap={
				text: 'input',
				hidden: 'input',
				radio: 'input',
				checkbox: 'input',
				button: 'input',
				submit: 'input',
				image: 'input',
				password: 'input',
				email: 'input',
				tel: 'input',
				select: 'select',
				textarea: 'textarea'
			};

			var el=document.createElement(typeMap[data.type]);
			if(data.type!=typeMap[data.type])
				el.type=data.type;

			for(var key in data) {
				if(key!='type') {
					if(key=='options')
						this._renderOptions(el,data[key]);
					else
						el[key]=data[key];
				}
			}

			return el;
		},

		_buildForm: function(data) {
			var table=document.createElement('table');
				table.className='table table-bordered table-striped';

			var tHead=document.createElement('thead');

			table.appendChild(tHead);

			var row=document.createElement('tr');
				cells=[document.createElement('th'),document.createElement('th')];

			cells[0].innerHTML='Parameter';
			cells[1].innerHTML='Value';
			row.appendChild(cells[0]);
			row.appendChild(cells[1]);

			tHead.appendChild(row);

			var tBody=document.createElement('tbody');

			table.appendChild(tBody);

			for(var key in data.parameters) {
				var row=document.createElement('tr'),
					cells=[document.createElement('td'),document.createElement('td')];

				cells[0].innerHTML='<code>'+key+'</code>';
				var field=this._buildElement(data.parameters[key]);
				field.id=key;
				cells[1].appendChild(field);
				row.appendChild(cells[0]);
				row.appendChild(cells[1]);

				tBody.appendChild(row);

				$(field).on('change keyup',this.validate.bind(this));
				$(field).on('focus',function() {
					this.scrollTop=100;
				});
			}

			return table;
		},

		_edit: function(interface,resource) {
			var data=this._currentResource=interfaces[interface][resource];

			$('[data-area="title"]').html(interface+'.'+resource);
			$('[data-area="description"]').html(data.description);
			$('[data-area="endpoint"]').html(data.endpoint).removeClass('hidden');

			$('[data-area="parameters"]').empty().append(this._buildForm(data));

			$('[data-area="parameters"]').find('input,select,textarea').get(0).focus();
		},

		_renderOptions: function(el,options) {
			var option;

			for(index in options) {
				option=document.createElement('option');
				option.value=options[index][0];
				option.text=options[index][1];
				el.appendChild(option);
			}

			return el;
		},

		_resetSelection: function() {
			$('#sandbox_nav a').each(function() {
				$(this).parent().removeClass('active');
			});

			return this;
		},

		edit: function(event) {
			var resource=$(event.target).attr('data-resource').split('.');

			try {
				if(interfaces[resource[0]][resource[1]]) {
					this.reset();

					$('#sandbox_nav a').each(function() {
						if(this===event.target)
							$(this).parent().addClass('active');
					});

					this._edit(resource[0],resource[1]);
				}
			}
			catch(error) { }

			return this;
		},

		initialize: function() {
			$('[data-resource]').on('click',this.edit.bind(this));
			$('#sandbox_form').find('input,select,textarea').on('change keyup',this.validate.bind(this));
			$('#sandbox_reset').on('click',this.reset.bind(this));
			$('#sandbox_code,#sandbox_code_inline').on('click',this.showCode.bind(this));
			$('#sandbox_run').on('click',this.makeRequest.bind(this));

			$('#api_key').get(0).focus();

			this.reset();
		},

		makeRequest: function() {
			try {
				var code=this._buildCode(this._currentResource);
				this.updateLoader(-1);
				this.updateLoader();
				eval(code);
			}
			catch(error) { 
				this.updateLoader(-1);
				alert('Sorry, something went wrong. Please try again.');
				console.log(error);
			}

			return this;
		},

		reset: function() {
			this._currentResource=null;
			this._resetSelection();

			$('[data-area]').each(function() {
				$(this).html($(this).attr('data-empty') || '');
			});

			$('code[data-area]').addClass('hidden');
			$('#sandbox_results').addClass('hidden');

			setTimeout(this.validate.bind(this),75);

			window.scrollTo(0,0);

			return this;
		},

		showCode: function() {
			$('[data-area="code"]').html(this._buildCode(this._currentResource));
			$('#sandbox_code_modal').removeClass('hidden');
			$('#sandbox_generated_code_close').get(0).focus();

			return this;
		},

		validate: function(event) {
			var result=true;
			$('#sandbox_form').find('input.required,select.required,textarea.required').each(function() {
				if(!result)
					return;

				if(!$(this).val())
					result=false;
			});

			if(result)
				$('#sandbox_run').attr('disabled',false).attr('title','Send the request.');
			else
				$('#sandbox_run').attr('disabled',true).attr('title','You must complete all fields in red.');

			if(event && event.type && event.type=='keyup')
				return true;

			return result;
		},

		updateLoader: function(stop) {
			var bar=$('#sandbox_loader > .bar').get(0),
				width=parseInt(bar.style.width,10) || 0;

			if(stop) {
				clearTimeout(this._loaderTimer);
				bar.style.width='0%';
				return;
			}

			width++;

			if(width>100)
				width=0;

			bar.style.width=width.toString()+'%';

			this._loaderTimer=setTimeout(this.updateLoader.bind(this),33);

			return this;
		}

	};

	function getOffset(el) {
	    var box=el.getBoundingClientRect();
	    
	    var body=document.body,
	    	docEl=document.documentElement,
	    	scrollTop=window.pageYOffset || docEl.scrollTop || body.scrollTop,
	    	scrollLeft=window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
	    	clientTop=docEl.clientTop || body.clientTop || 0,
	    	clientLeft=docEl.clientLeft || body.clientLeft || 0,
	    	top=box.top+scrollTop-clientTop,
	    	left=box.left+scrollLeft-clientLeft;
	    
	    return {top: Math.round(top),left: Math.round(left)};
	}


	resources.initialize();
});