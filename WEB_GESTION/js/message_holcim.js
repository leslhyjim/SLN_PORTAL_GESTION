function message_delete(text,method) {
    
    text = valid_text(text, message_sweet_alert._delete);
    method = valid_method(method);
 
    swal({
        title: "",
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false
    },
      function () {
          method();
      });
}

function message_save(text,method) {
    text = valid_text(text, message_sweet_alert._save);
    method = valid_method(method);
    swal({
        title: '',
        text: text,
        type: 'success',
        confirmButtonText: 'Aceptar',
    },
    function () {
        method();
    });
}

function message_save(text, method) {
    text = valid_text(text, message_sweet_alert._save);
    method = valid_method(method);
    swal({
        title: '',
        text: text,
        type: 'success',
        confirmButtonText: 'Aceptar',
    },function () {
        method();
    });
}

function message_general(text, method) {
    text = valid_text(text, message_sweet_alert._general);
    method = valid_method(method);
    swal({
        title: '',
        text: text,
        type: 'success',
        confirmButtonText: 'Aceptar',
    }, function () {
        method();
    });
}

function message_informacion(text, method) {
    text = valid_text(text, message_sweet_alert._informativo);
    method = valid_method(method);
    swal({
        title: '',
        text: text,
        type: 'info',
        confirmButtonText: 'Aceptar',
    }, function () {
        method();
    });
}

function message_warning(text, method) {
    text = valid_text(text, message_sweet_alert._warning);
    method = valid_method(method);
    swal({
        title: "",
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false
    },
      function () {
          method();
      });
}

var message_sweet_alert = {
    _delete: "Esta seguro de eliminar el registro",
    _save: "Se guardo la informacion con exito",
    _general: "El proceso se realizo con exito",
    _warning: "Cuidado!",
    _informativo: "!",
}

function valid_method(method) {
    if (method == null || method == "" || method == undefined)
        return method = function () { };
    return method;
}

function valid_text(text, message) {
    if (text == null || text == "" || text == undefined)
        return message;
    return text
}

