
requirejs.config({
	paths: {
		jQuery: 'libs/jquery/jquery',
		Underscore: 'libs/underscore',
		Backbone: 'libs/backbone',
		Bootstrap: 'libs/bootstrap',
		Handlebars: 'libs/handlebars-1.0.0.beta.6',
		HandlebarsHelpers: 'libs/handlebarsHelpers',
		DateFormat: 'libs/date.format',
		BrowserEngines: 'libs/browserEngines',
		FiddleEditor: 'libs/fiddleEditor',
		CodeMirror: 'libs/codemirror/codemirror',
		MySQLCodeMirror: 'libs/codemirror/mode/mysql/mysql',
		XPlans: 'libs/xplans',
		DDLBuilder: 'libs/ddl_builder',
		QUnit: 'libs/qunit-1.10.0'
	},
	
    shim: {
        Backbone: {
			deps: ['Underscore', 'jQuery', 'libs/json2'],
			exports: 'Backbone'
		},
        jQuery: {
			exports: '$'
		},
        Underscore: {
			exports: '_'
		},
		CodeMirror: {
			exports: 'CodeMirror'
		},
		Handlebars: {
			exports: 'Handlebars'
		},
		DateFormat: {
			exports: 'dateFormat'
		},
		'XPlans/oracle/loadswf': {
			deps: ['XPlans/oracle/flashver'],
			exports: "loadswf" 
		},
		'XPlans/mssql': {
			exports: "QP"
		},
		QUnit: {
			exports: function () { return { "test": test, "equal": equal, "ok": ok } }
		},
		MySQLCodeMirror : ['CodeMirror'],		
		'libs/jquery/jquery.blockUI': ['jQuery'],
		'libs/jquery/jquery.cookie': ['jQuery'],
		'Bootstrap/bootstrap-collapse': ['jQuery'],
		'Bootstrap/bootstrap-tab': ['jQuery'],
		'Bootstrap/bootstrap-dropdown': ['jQuery'],
		'Bootstrap/bootstrap-modal': ['jQuery'],
		'Bootstrap/bootstrap-tooltip': ['jQuery'],
		'Bootstrap/bootstrap-popover': ['jQuery','Bootstrap/bootstrap-tooltip']		
	}
	
});	

require(['libs/ddl_builder/qunit/main'], function () {});
