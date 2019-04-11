var elementos_idioma_original;
$(document).ready(function() {
	//Clonar todos los elementos con la clase idioma-trad, para tener el resplado del idioma original
	elementos_idioma_original = $('.idioma-trad').clone(); 
	var ln = x=window.navigator.language||navigator.browserLanguage;
	$("#idioma").val(ln).trigger('change');
});

function traducir(elemento){
	var idioma = $(elemento).val();
	var elementos = $('.idioma-trad');
	if(idioma == 'es'){
		$.each(elementos, function(index, ele) {
			$(ele).text(  $(elementos_idioma_original[index]).text() );
		});
		return false;
	}

	$.each(elementos, function(index, ele) {
		var traduccion = apiGoogleTraslate(ele, idioma ,index);
	});
}

function apiGoogleTraslate(elemento, idioma, index) {
	var texto =  $(elementos_idioma_original[index]).text();
	var texto_a_traducir = $.trim( texto);
	var idioma_original = 'auto';
	var idioma_a_traducir = idioma;

	var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
			+ idioma_original + "&tl=" + idioma_a_traducir + "&dt=t&q=" + encodeURI(texto_a_traducir);

	var traduccion = '';
	$.ajax({
		url: url,
		dataType: 'json',
		crossDomain: true
	}).done(function(r) {
		var r = r[0];
		var traduccion = '';
		if(r.length > 0){
			for(var i = 0;i<r.length;i++){
				traduccion += r[i][0];
			}
			$(elemento).text(traduccion);
		}else{
			$(elemento).text(r[0][0]);
		}
	}).fail(function(e) {
		console.log('error',e);
	}).always(function() {

	});
}
