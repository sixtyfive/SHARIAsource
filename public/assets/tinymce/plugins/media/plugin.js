tinymce.PluginManager.add("media",function(e,t){function i(e){return-1!=e.indexOf(".mp3")?"audio/mpeg":-1!=e.indexOf(".wav")?"audio/wav":-1!=e.indexOf(".mp4")?"video/mp4":-1!=e.indexOf(".webm")?"video/webm":-1!=e.indexOf(".ogg")?"video/ogg":-1!=e.indexOf(".swf")?"application/x-shockwave-flash":""}function r(t){var i=e.settings.media_scripts;if(i)for(var r=0;r<i.length;r++)if(-1!==t.indexOf(i[r].filter))return i[r]}function o(){function t(e){var t,i,a,c;t=r.find("#width")[0],i=r.find("#height")[0],a=t.value(),c=i.value(),r.find("#constrain")[0].checked()&&o&&m&&a&&c&&(e.control==t?(c=Math.round(a/o*c),i.value(c)):(a=Math.round(c/m*a),t.value(a))),o=a,m=c}function i(){u=n(this.value()),this.parent().parent().fromJSON(u)}var r,o,m,u,l=[{name:"source1",type:"filepicker",filetype:"media",size:40,autofocus:!0,label:"Source",onchange:function(e){tinymce.each(e.meta,function(e,t){r.find("#"+t).value(e)})}}];e.settings.media_alt_source!==!1&&l.push({name:"source2",type:"filepicker",filetype:"media",size:40,label:"Alternative source"}),e.settings.media_poster!==!1&&l.push({name:"poster",type:"filepicker",filetype:"image",size:40,label:"Poster"}),e.settings.media_dimensions!==!1&&l.push({type:"container",label:"Dimensions",layout:"flex",align:"center",spacing:5,items:[{name:"width",type:"textbox",maxLength:3,size:3,onchange:t},{type:"label",text:"x"},{name:"height",type:"textbox",maxLength:3,size:3,onchange:t},{name:"constrain",type:"checkbox",checked:!0,text:"Constrain proportions"}]}),u=s(e.selection.getNode()),o=u.width,m=u.height;var h={id:"mcemediasource",type:"textbox",flex:1,name:"embed",value:a(),multiline:!0,label:"Source"};h[d]=i,r=e.windowManager.open({title:"Insert/edit video",data:u,bodyType:"tabpanel",body:[{title:"General",type:"form",onShowTab:function(){u=n(this.next().find("#embed").value()),this.fromJSON(u)},items:l},{title:"Embed",type:"panel",layout:"flex",direction:"column",align:"stretch",padding:10,spacing:10,onShowTab:function(){this.find("#embed").value(c(this.parent().toJSON()))},items:[{type:"label",text:"Paste your embed code below:",forId:"mcemediasource"},h]}],onSubmit:function(){var t,i,r,o;for(t=e.dom.select("img[data-mce-object]"),e.insertContent(c(this.toJSON())),i=e.dom.select("img[data-mce-object]"),r=0;r<t.length;r++)for(o=i.length-1;o>=0;o--)t[r]==i[o]&&i.splice(o,1);e.selection.select(i[0]),e.nodeChanged()}})}function a(){var t=e.selection.getNode();return t.getAttribute("data-mce-object")?e.selection.getContent():void 0}function c(o){var a="";if(!o.source1&&(tinymce.extend(o,n(o.embed)),!o.source1))return"";if(o.source2||(o.source2=""),o.poster||(o.poster=""),o.source1=e.convertURL(o.source1,"source"),o.source2=e.convertURL(o.source2,"source"),o.source1mime=i(o.source1),o.source2mime=i(o.source2),o.poster=e.convertURL(o.poster,"poster"),o.flashPlayerUrl=e.convertURL(t+"/moxieplayer.swf","movie"),tinymce.each(u,function(e){var t,i,r;if(t=e.regex.exec(o.source1)){for(r=e.url,i=0;t[i];i++)r=r.replace("$"+i,function(){return t[i]});o.source1=r,o.type=e.type,o.width=o.width||e.w,o.height=o.height||e.h}}),o.embed)a=m(o.embed,o,!0);else{var c=r(o.source1);c&&(o.type="script",o.width=c.width,o.height=c.height),o.width=o.width||300,o.height=o.height||150,tinymce.each(o,function(t,i){o[i]=e.dom.encode(t)}),"iframe"==o.type?a+='<iframe src="'+o.source1+'" width="'+o.width+'" height="'+o.height+'"></iframe>':"application/x-shockwave-flash"==o.source1mime?(a+='<object data="'+o.source1+'" width="'+o.width+'" height="'+o.height+'" type="application/x-shockwave-flash">',o.poster&&(a+='<img src="'+o.poster+'" width="'+o.width+'" height="'+o.height+'" />'),a+="</object>"):-1!=o.source1mime.indexOf("audio")?e.settings.audio_template_callback?a=e.settings.audio_template_callback(o):a+='<audio controls="controls" src="'+o.source1+'">'+(o.source2?'\n<source src="'+o.source2+'"'+(o.source2mime?' type="'+o.source2mime+'"':"")+" />\n":"")+"</audio>":"script"==o.type?a+='<script src="'+o.source1+'"></script>':a=e.settings.video_template_callback?e.settings.video_template_callback(o):'<video width="'+o.width+'" height="'+o.height+'"'+(o.poster?' poster="'+o.poster+'"':"")+' controls="controls">\n<source src="'+o.source1+'"'+(o.source1mime?' type="'+o.source1mime+'"':"")+" />\n"+(o.source2?'<source src="'+o.source2+'"'+(o.source2mime?' type="'+o.source2mime+'"':"")+" />\n":"")+"</video>"}return a}function n(e){var t={};return new tinymce.html.SaxParser({validate:!1,allow_conditional_comments:!0,special:"script,noscript",start:function(e,i){if(t.source1||"param"!=e||(t.source1=i.map.movie),("iframe"==e||"object"==e||"embed"==e||"video"==e||"audio"==e)&&(t.type||(t.type=e),t=tinymce.extend(i.map,t)),"script"==e){var o=r(i.map.src);if(!o)return;t={type:"script",source1:i.map.src,width:o.width,height:o.height}}"source"==e&&(t.source1?t.source2||(t.source2=i.map.src):t.source1=i.map.src),"img"!=e||t.poster||(t.poster=i.map.src)}}).parse(e),t.source1=t.source1||t.src||t.data,t.source2=t.source2||"",t.poster=t.poster||"",t}function s(t){return t.getAttribute("data-mce-object")?n(e.serializer.serialize(t,{selection:!0})):{}}function m(e,t,i){function r(e,t){var i,r,o,a;for(i in t)if(o=""+t[i],e.map[i])for(r=e.length;r--;)a=e[r],a.name==i&&(o?(e.map[i]=o,a.value=o):(delete e.map[i],e.splice(r,1)));else o&&(e.push({name:i,value:o}),e.map[i]=o)}var o,a=new tinymce.html.Writer,c=0;return new tinymce.html.SaxParser({validate:!1,allow_conditional_comments:!0,special:"script,noscript",comment:function(e){a.comment(e)},cdata:function(e){a.cdata(e)},text:function(e,t){a.text(e,t)},start:function(e,n,s){switch(e){case"video":case"object":case"embed":case"img":case"iframe":r(n,{width:t.width,height:t.height})}if(i)switch(e){case"video":r(n,{poster:t.poster,src:""}),t.source2&&r(n,{src:""});break;case"iframe":r(n,{src:t.source1});break;case"source":if(c++,2>=c&&(r(n,{src:t["source"+c],type:t["source"+c+"mime"]}),!t["source"+c]))return;break;case"img":if(!t.poster)return;o=!0}a.start(e,n,s)},end:function(e){if("video"==e&&i)for(var n=1;2>=n;n++)if(t["source"+n]){var s=[];s.map={},n>c&&(r(s,{src:t["source"+n],type:t["source"+n+"mime"]}),a.start("source",s,!0))}if(t.poster&&"object"==e&&i&&!o){var m=[];m.map={},r(m,{src:t.poster,width:t.width,height:t.height}),a.start("img",m,!0)}a.end(e)}},new tinymce.html.Schema({})).parse(e),a.getContent()}var u=[{regex:/youtu\.be\/([\w\-.]+)/,type:"iframe",w:425,h:350,url:"//www.youtube.com/embed/$1"},{regex:/youtube\.com(.+)v=([^&]+)/,type:"iframe",w:425,h:350,url:"//www.youtube.com/embed/$2"},{regex:/vimeo\.com\/([0-9]+)/,type:"iframe",w:425,h:350,url:"//player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc"},{regex:/vimeo\.com\/(.*)\/([0-9]+)/,type:"iframe",w:425,h:350,url:"//player.vimeo.com/video/$2?title=0&amp;byline=0"},{regex:/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,type:"iframe",w:425,h:350,url:'//maps.google.com/maps/ms?msid=$2&output=embed"'}],d=tinymce.Env.ie&&tinymce.Env.ie<=8?"onChange":"onInput";e.on("ResolveName",function(e){var t;1==e.target.nodeType&&(t=e.target.getAttribute("data-mce-object"))&&(e.name=t)}),e.on("preInit",function(){var t=e.schema.getSpecialElements();tinymce.each("video audio iframe object".split(" "),function(e){t[e]=new RegExp("</"+e+"[^>]*>","gi")});var i=e.schema.getBoolAttrs();tinymce.each("webkitallowfullscreen mozallowfullscreen allowfullscreen".split(" "),function(e){i[e]={}}),e.parser.addNodeFilter("iframe,video,audio,object,embed,script",function(t,i){for(var o,a,c,n,s,m,u,d,l=t.length;l--;)if(a=t[l],a.parent&&("script"!=a.name||(d=r(a.attr("src"))))){for(c=new tinymce.html.Node("img",1),c.shortEnded=!0,d&&(d.width&&a.attr("width",d.width.toString()),d.height&&a.attr("height",d.height.toString())),m=a.attributes,o=m.length;o--;)n=m[o].name,s=m[o].value,"width"!==n&&"height"!==n&&"style"!==n&&(("data"==n||"src"==n)&&(s=e.convertURL(s,n)),c.attr("data-mce-p-"+n,s));u=a.firstChild&&a.firstChild.value,u&&(c.attr("data-mce-html",escape(u)),c.firstChild=null),c.attr({width:a.attr("width")||"300",height:a.attr("height")||("audio"==i?"30":"150"),style:a.attr("style"),src:tinymce.Env.transparentSrc,"data-mce-object":i,"class":"mce-object mce-object-"+i}),a.replace(c)}}),e.serializer.addAttributeFilter("data-mce-object",function(e,t){for(var i,r,o,a,c,n,s,m=e.length;m--;)if(i=e[m],i.parent){for(s=i.attr(t),r=new tinymce.html.Node(s,1),"audio"!=s&&"script"!=s&&r.attr({width:i.attr("width"),height:i.attr("height")}),r.attr({style:i.attr("style")}),a=i.attributes,o=a.length;o--;){var u=a[o].name;0===u.indexOf("data-mce-p-")&&r.attr(u.substr(11),a[o].value)}"script"==s&&r.attr("type","text/javascript"),c=i.attr("data-mce-html"),c&&(n=new tinymce.html.Node("#text",3),n.raw=!0,n.value=unescape(c),r.append(n)),i.replace(r)}})}),e.on("ObjectSelected",function(e){var t=e.target.getAttribute("data-mce-object");("audio"==t||"script"==t)&&e.preventDefault()}),e.on("objectResized",function(e){var t,i=e.target;i.getAttribute("data-mce-object")&&(t=i.getAttribute("data-mce-html"),t&&(t=unescape(t),i.setAttribute("data-mce-html",escape(m(t,{width:e.width,height:e.height})))))}),e.addButton("media",{tooltip:"Insert/edit video",onclick:o,stateSelector:["img[data-mce-object=video]","img[data-mce-object=iframe]"]}),e.addMenuItem("media",{icon:"media",text:"Insert video",onclick:o,context:"insert",prependToContext:!0})});