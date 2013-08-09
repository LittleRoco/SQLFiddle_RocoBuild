define(["jQuery", "Backbone"], function ($, Backbone) {
	
	var Query = Backbone.Model.extend({
	
		defaults: {
			"id": 0,
			"sql": "",
			"sets": [],
			"pendingChanges": false,
			"statement_separator": ";"
		},
		reset: function () {
			this.set(this.defaults);
			this.trigger("reloaded");
		},		
		execute: function () {
			
			var thisModel = this;
			
			if (! this.has("schemaDef") || 
				! this.get("schemaDef").has("dbType") || 
				! this.get("schemaDef").get("ready") )
			{ return false; }
						
			$.ajax({
				
				type: "POST",
				url: "index.cfm/fiddles/runQuery",
				data: {
					db_type_id: this.get("schemaDef").get("dbType").id,
					schema_short_code: this.get("schemaDef").get("short_code"),
					statement_separator: this.get("statement_separator"),
					sql: this.get("sql")
				},
				dataType: "json",
				success: function (resp, textStatus, jqXHR) {
					if (thisModel.get("schemaDef").get("dbType").get("context") == "browser")
					{
						thisModel.get("schemaDef").get("browserEngines")[thisModel.get("schemaDef").get("dbType").get("className")].executeQuery({
							sql: thisModel.get("sql"),
							statement_separator: thisModel.get("statement_separator"),
							success: function (sets) {
								thisModel.set({
									"id": resp["ID"],
									"sets": sets
								});
								thisModel.trigger("executed");
							},
							error: function (e) {
								thisModel.set({
									"sets": [{
												"SUCCEEDED": false,
												"ERRORMESSAGE": e
											}]
								});				
								thisModel.trigger("executed");
							}
						});
					}
					else
					{
						thisModel.set({
							"id": resp["ID"],
							"sets": resp["sets"]
						});
					}
				},
				error: function (jqXHR, textStatus, errorThrown)
				{
					thisModel.set({
						"sets": []
					});				
				},
				complete: function (jqXHR, textStatus)
				{
					thisModel.trigger("executed");
				}
			});
			
		}
	
	});
	
	return Query;
	
});
