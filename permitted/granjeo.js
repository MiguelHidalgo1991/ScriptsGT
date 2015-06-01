javascript:coords='475|447 476|445';
var%20doc=document;
if(window.frames.length>0)
	doc=window.main.document;
url=document.URL;
if(url.indexOf('screen=place')==-1)
alert('No%20estas%20en%20la%20plaza%20de%20reuniones'); 
coords=coords.split("%20");
index=Math.round(Math.random()*(coords.length-1));
coords=coords[index];
coords=coords.split("|");
doc.forms[0].x.value=coords[0];
doc.forms[0].y.value=coords[1];
insertUnit(doc.forms[0].spy, 1);insertUnit(doc.forms[0].light, 4);
end();