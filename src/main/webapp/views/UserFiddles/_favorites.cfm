	<cfif favorites.recordCount>
		
	<table class="table table-striped" id="fiddle_favorites_table">
		<thead>
			<th>Database Type</th>
			<th>Identifier</th>
			<th>My Last Access</th>
			<th>My # Accesses</th>
			<th colspan="3">&nbsp;</th>
		</thead>
		<tbody>		
		<cfoutput query="favorites" group="schema_fragment">
			<cfset query_access = DateAdd('h', #getTimeZoneInfo().utcHourOffset#-#params.tz#, last_accessed)>
				
			<tr>
				<td>#full_name#</td>
				<td><a href="##!#schema_fragment#/#query_id#">##!#schema_fragment#/#query_id#</a></td>
				<td>#DateFormat(query_access, "mm/dd/yyyy")# #TimeFormat(query_access, "hh:mm tt")#</td>
				<td>#num_accesses#</td>

				<td>&nbsp;	
					<a href="##removeFavorite" schema_def_id="#schema_def_id#" query_id="#query_id#" title="Remove from favorites" class="favorite"><i class="icon-star"></i></a>
				</td>

				<td>
					<cfif IsJSON(structure_json)>
						
						<div class="schemaPreviewWrapper">
							<cfset tableCount = 0>
								<cfset tables = deserializeJSON(structure_json)>
		
								<ul class="tables">
									
									<cfloop array="#tables#" index="thisTable" >
									<cfset tableCount ++>
									<li>
										#thisTable.table_name# (#thisTable.table_type#)
										<ul class="columns">
											<cfloop array="#thisTable.columns#" index="col">
											<li>#col.name# #col.type#</li>
											</cfloop>
										</ul>
									</li>
									</cfloop>
									
								</ul>
						</div>	
						<a href="##!#schema_fragment#" class="label label-info preview-schema popover-anchor">#tableCount# table<cfif tableCount IS NOT 1>s</cfif></a>
				
					<cfelse>
						<div class="schemaPreviewWrapper">
							<div class="schemaPreview">
								#HTMLCodeFormat(Left(ddl, 400))#
							</div>
						</div>					
						<a href="##!#schema_fragment#" class="label label-info preview-ddl popover-anchor">preview ddl</a>
					</cfif>
				</td>
				<td>
					<cfif IsJSON(structure_json)>
				
						<cfset numSets = 0>
						<div class="resultSetWrapper">
							<ol class="resultSetPreview">
							<cfoutput>
								<cfif IsNumeric(set_id)>
									<cfset numSets++>
										<li class="statement_preview"><pre>#HTMLEditFormat(sql)#</pre></li>
									<cfif succeeded>
										<li class="alert alert-success">Rows: #row_count#<cfif len(columns_list)> Cols: #columns_list#</cfif></li>									
									<cfelse>									
										<li class="alert alert-error">#error_message#</li>										
									</cfif>							
								</cfif>
							</cfoutput>
							</ol>
						</div>
						<a href="##!#schema_fragment#/#query_id#" class="label label-info result-sets popover-anchor">#numSets# result set<cfif numSets IS NOT 1>s</cfif></a>
						
					<cfelse>
						<div class="resultSetWrapper">
							<div class="resultSetPreview">
							#HTMLCodeFormat(Left(full_sql, 400))#
							</div>
						</div>					
						<a href="##!#schema_fragment#/#query_id#" class="label label-info preview-sql popover-anchor">preview sql</a>
					</cfif>
					
				</td>
	
			</tr>

		</cfoutput>
		</tbody>
	</table>
	
	<cfelse>
		
	<div class="alert">
	  <h4 class="alert-heading">No Favorites Found!</h4> Use the "Fiddle History" tab to find those you've used recently, then click on the star for queries you'd like to save as a favorite.
	</div>	
	</cfif>
