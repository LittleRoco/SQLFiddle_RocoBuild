define(["Handlebars"],function(e){e.registerHelper("each_simple_value_with_index",function(e,t){var n="";k=0;for(var r=0,i=e.length;r<i;r++){var s={value:e[r]};s.index=k,s.first=k==0,s.last=k==e.length,n+=t(s),k++}return n})})