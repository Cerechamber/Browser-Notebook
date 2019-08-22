function findtime() {
var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
if (month < 10) month = '0' + month; 
var day = d.getDate();
if (day < 10) day = '0' + day; 
var hours = d.getHours();
if (hours < 10) hours = '0' + hours; 
var minutes = d.getMinutes();
if (minutes < 10) minutes = '0' + minutes; 
var seconds = d.getSeconds();
if (seconds < 10) seconds = '0' + seconds; 
var fulldate = hours + ':' + minutes + ':' + seconds + ' / ' + day + '.' + month + '.' + year;
return fulldate;
}


var save = document.getElementById('save');
save.disabled = true;
var cancel = document.getElementById('cancel');
cancel.disabled = true;
var edit = document.getElementById('edit');
edit.disabled = false;
var text = document.getElementById('text');
text.contentEditable = false;
var check = false;

var input = document.querySelector('input');
var colour = document.getElementById('form');
colour.hidden = true;

edit.addEventListener('click', function(){
cancel.disabled = false;
save.disabled = false;
text.contentEditable = true;
edit.disabled = true;
colour.hidden = false;
});

var popup = document.getElementById('popup');
popup.hidden = true;
var version_default = text.innerHTML;
if (!localStorage.length) {
	localStorage.setItem(0 + 'version', version_default);
	localStorage.setItem(0 + 'time', findtime());
	localStorage.setItem('num', 0);
}
var i = 0;

function counter() {
	if (localStorage.getItem('num') > 0) {
		var item = localStorage.getItem('num');
		++item;
		localStorage.setItem('num', item)
		return localStorage.getItem('num');
	}
	else{
	localStorage.setItem('num', ++i);
	return localStorage.getItem('num');
   }
}

save.addEventListener('click', function(){
var version = text.innerHTML;
var count = counter();
localStorage.setItem(count + 'version', version);
edit.disabled = false;
save.disabled = true;
cancel.disabled = true;
text.contentEditable = false;
localStorage.setItem(count + 'time', findtime());
check = true;
colour.hidden = true;
});


cancel.addEventListener('click', function(){
	edit.disabled = false;
	save.disabled = true;
	cancel.disabled = true;
	text.contentEditable = false;
	colour.hidden = true;
	text.innerHTML = localStorage.getItem(localStorage.getItem('num') + 'version');
});

document.addEventListener('DOMContentLoaded', function(){
	if (!localStorage.getItem('1version')) return;
	var num = localStorage.getItem('num');
	var header = document.querySelector('strong');

	while (num >= 0) {
		var part = document.createElement('article');
		part.style.marginTop = '25px';
		part.style.cursor = 'pointer';
		var vers = localStorage.getItem(num + 'version');
		part.innerHTML = '<b>Версия №</b>' + num + ' от ' + localStorage.getItem(num + 'time') + ' \n\r"' + vers.substr(0, 100) + '...' + '"';
		popup.insertBefore(part, popup.children[1]);
		--num;
	}

	popup.hidden = false;
	document.querySelector('.container').setAttribute('style', 'filter: blur(5px);');
	window.collect = popup.children;
	collect = [].slice.call(collect);
	collect.shift();
	});

    var number = 0;
	popup.addEventListener('click', function(event){
		var target = event.target;
		if (target.nodeName == 'ARTICLE' || target.parentNode.tagName == 'ARTICLE') {
			for (var y = 0; y < collect.length; y++) {
				if (collect[y].isEqualNode(target) || collect[y].isEqualNode(target.parentNode)) number = y;
			}
		 text.innerHTML = localStorage.getItem(number + 'version');
			popup.hidden = true;
			document.querySelector('.container').setAttribute('style', '');
		}

	});

window.onbeforeunload = function(){
	if ((edit.disabled) && (text.innerHTML != localStorage.getItem(number + 'version')) && (!check)) {
		return 'Точно? Измененный текст не сохранен';
	}
};



var butt = document.querySelector('#butt');
butt.addEventListener('click', function(ev){
		ev.preventDefault();
		var color = input.value;
		document.execCommand('insertHTML', false, `<span style="color: ${color}">${document.getSelection()}</span>`);	
	});






 
