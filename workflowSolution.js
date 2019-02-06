    // To get all workflow instances from workflow definition 'addresschangewf'
	
		getTaskInstances : function(){
			var that = this;
		    $.ajax({
				url:"/bpmworkflowruntimewfs/rest/v1/task-instances?workflowDefinitionId=addresschangewf&activityId=usertask2&status=READY",
				method: "GET",
				dataType: "json",
				success: function (oData) {
                   console.log(oData);
				},
				error: function (err) {
                   alert(err);
				}
			});	
		},
		
	// 	To complete the user task 
	
		completeUserTask : function(){
					var payload = {
						"context": that.getContextForInstance(instanceId,token),   
						 "status": "COMPLETED",
					};
					$.ajax({
							pressProceed : function(){
							var that = this;
							var token = this._fetchToken();
							instanceId = "you can get from ";
							url : "/bpmworkflowruntimewfs/rest/v1/task-instances/"+instanceId,
							method: "PATCH",
							dataType: "json",
							contentType :"application/json",
							data: JSON.stringify(payload),
							async : false,
							headers: {
								"X-CSRF-Token": token
							},
							success: function(){
								console.log("Completed");
							},
							error : function(err){
								console.log(err);
							}
					});
			},
			
		// To get the context for task instance	
		
	    getContextForInstance : function(instanceId,token){
				  var context;
				  $.ajax({
							url : "/bpmworkflowruntimewfs/rest/v1/task-instances/"+instanceId+"/context",
							method: "GET",
							dataType: "json",
							contentType :"application/json",
							async : false,
							headers: {
								"X-CSRF-Token": token
							},
							success: function(oData){
								context = oData;
							},
							error : function(err){
								console.log(err);
							}
						});
						return context;
				},
			
	// 	To fetch the token
	
		_fetchToken: function() {
			var token;
			$.ajax({
				url: "/bpmworkflowruntimewfs/rest/v1/xsrf-token",
				method: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function(result, xhr, data) {
					token = data.getResponseHeader("X-CSRF-Token");
				}
			});
			return token;
		}		