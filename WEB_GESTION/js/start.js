var notOpt = [];

function cargarOpciones(all, user) {
    var padre = [], hijo = [], padreHijo = [], padreElemento = [], hijoElemento = [];

    $.each(all, function (i, original) {
        if (JSON.stringify(user).indexOf(original.id_elemento) == -1) {
            if (original.idPadre == 0) {
                padre.push(original.id);
                padreElemento.push(original.id_elemento);                
            }
            else {
                hijo.push(original.id);
                hijoElemento.push(original.id_elemento);
                padreHijo.push(original.idPadre);
            }
        }        
    });
    
    $.each(all, function (i, original) {
        var index = "";
        if (JSON.stringify(user).indexOf(original.id_elemento) != -1) {           
            if (padre.indexOf(original.idPadre) != -1) {
                index = padre.indexOf(original.idPadre);
                padre.splice(index, 1);
                padreElemento.splice(index, 1);
            }
            if (hijo.indexOf(original.idPadre) != -1) {
                var valor = padreHijo[hijo.indexOf(original.idPadre)];
                if (padre.indexOf(valor) != -1) {
                    index = padre.indexOf(valor);
                    padre.splice(index, 1);
                    padreElemento.splice(index, 1);
                }
                index = hijo.indexOf(original.idPadre);
                hijo.splice(index, 1);
                hijoElemento.splice(index, 1);
            }            
        }
    });
    
    $.each(padreElemento, function (i, elemento) {
        if ($("#" + elemento).length > 0) {
            $("#" + elemento).remove();
        }
        else if ($("." + elemento).length > 0) {
            $("." + elemento).remove();
        }

        notOpt.push(elemento);
    });

    $.each(hijoElemento, function (i, elemento) {
        if ($("#" + elemento).length > 0) {
            $("#" + elemento).remove();
        }
        else if ($("." + elemento).length > 0) {
            $("." + elemento).remove();
        }

        notOpt.push(elemento);
    });

}