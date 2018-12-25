function successLogout(result) {
    window.location = "../inicio-sesion/";
}

function failLogut(error) {
    MensajeToast("Falló login", error.get_message(), "error");
}

//Utilidades
$(document).ready(function () {
    $('.modal').modal({ backdrop: 'static', keyboard: false, show: false });

    $('.modal').on('shown.bs.modal', function () {
        $("body").addClass("removeOverflowY");
        $(".modal").addClass("addOverflowY");
    });

    $('.modal').on('hidden.bs.modal', function () {
        $("body").removeClass("removeOverflowY");
        $(".modal").removeClass("addOverflowY");
    });
});

//Toast notification
function MensajeToast(cabecera, mensaje, icono) {
    $.toast({
        heading: cabecera,
        text: mensaje,
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: icono, //info, warning, error, success
        hideAfter: 4000,
        stack: 6
    });
}

//Validar Cédula
function UtilValidarCedula(Cedula) {
    if (Cedula.length == 10) {
        var NumeroProvincias = 24;
        var Total = 0;
        var Coeficientes = [];
        var Dividendo = 0;
        var DigitoVerificadorRecibido = 0;
        var Provincia = parseInt(Cedula.substr(0, 2));
        var DigitoTres = parseInt(Cedula.substr(2, 1));
        if (DigitoTres < 6) {
            Coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
            DigitoVerificadorRecibido = parseInt(Cedula.substr(9, 1));
            Dividendo = 10;
        }
        if (DigitoTres == 6) {
            Coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
            DigitoVerificadorRecibido = parseInt(Cedula.substr(8, 1));
            Dividendo = 11;
        }
        if (DigitoTres == 9) {
            Coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
            DigitoVerificadorRecibido = parseInt(Cedula.substr(9, 1));
            Dividendo = 11;
        }
        if (Provincia > 0 && Provincia <= NumeroProvincias) {
            for (var i = 0; i < Coeficientes.length; i++) {
                var Valor = parseInt(Coeficientes[i]) * parseInt(Cedula.substr(i, 1));
                if (DigitoTres < 6) { Total = Valor >= 10 ? Total + (Valor - 9) : Total + Valor; }
                else { Total = Total + Valor; }
            }
            var DigitoVerificadoObtenido = Total >= Dividendo ? (Total % Dividendo) != 0 ? Dividendo - (Total % Dividendo) : (Total % Dividendo) : Total;
            if (DigitoVerificadoObtenido == DigitoVerificadorRecibido) { return true }
            else { return false }
        }
        else { return false }
    }
    else { return false }
}

//Validar RUC
function UtilValidarRUC(RUC) {
    if (RUC.length == 13) {
        if (UtilValidarCedula(RUC.substr(0, 10))) {
            // NO NECESARIAMENTE TERMINA EN 001
            return true
        }
        else { return false }
    }
    else { return false }
}

//onBlur Cedula
function onBlurCedula(inp) {
    var valor = document.getElementById(inp.id).value;
    if (!UtilValidarCedula(valor) && valor != "") {
        MensajeToast("Error de ingreso", "Verifique que la cédula sea correcta", "error");
        inp.focus();
    }
}

//onBlur RUC
function onBlurRUC(inp) {
    var valor = document.getElementById(inp.id).value;
    if (!UtilValidarRUC(valor) && valor != "") {
        MensajeToast("Error de ingreso", "Verifique que el RUC sea correcto", "error");
        inp.focus();
    }
}

//No ingresar espacios
function notFirstSpaces(obj, event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    var texto = document.getElementById(obj).value;
    if (keyCode === 32 && texto === "") {
        return false;
    }
}

//Limpia espacio en blanco onBlur
function trimFocus(obj) {
    var str = document.getElementById(obj).value;
    document.getElementById(obj).value = str.trim();
}

//Solo ingresa números y decimales
function onlyDecimal(obj, event) {
    var texto = document.getElementById(obj).value;
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

    if (keyCode == 46 && texto.length <= 0) {
        return false;
    }

    if ((keyCode != 46 || texto.indexOf('.') != -1) && keyCode != 0 && keyCode != 8 && (keyCode < 48 || keyCode > 57)) {
        return false;
    }

};

//Solo números y decimales onBlur
function blurOnlyDecimal(obj) {
    var input = document.getElementById(obj);
    var valor = input.value;

    if (valor.charCodeAt(valor.length - 1) == 46) {
        input.value = valor.substring(0, valor.length - 1);
    }

    if (valor.charCodeAt(0) == 46) {
        input.value = "0." + valor.substring(1);
    }

    if (valor.indexOf(".") != -1 && valor.substring(valor.indexOf(".") + 1).length > 2) {
        input.value = valor.substring(0, valor.indexOf(".") + 3)
        MensajeToast("Validación de campo", "Solo se admiten hasta 2 decimales.", "error");
        input.focus();
    }

    for (i = 0; i < valor.length; i++) {
        var keyCode = valor.charCodeAt(i);
        if (keyCode !== 8 && keyCode !== 46 && keyCode !== 0 && (keyCode < 48 || keyCode > 57)) {
            input.value = "";
            input.focus();
        }
    }
}

//Solo números y decimales onBlur mayor 0 menor 100
function blurOnlyDecimal0100(obj) {
    var input = document.getElementById(obj);
    var valor = input.value;

    if (valor.charCodeAt(valor.length - 1) == 46) {
        input.value = valor.substring(0, valor.length - 1);
    }

    if (valor.charCodeAt(0) == 46) {
        input.value = "0." + valor.substring(1);
    }

    if (valor.indexOf(".") != -1 && valor.substring(valor.indexOf(".") + 1).length > 2) {
        input.value = valor.substring(0, valor.indexOf(".") + 3)
        MensajeToast("Validación de campo", "Solo se admiten hasta 2 decimales.", "error");
        input.focus();
    }

    for (i = 0; i < valor.length; i++) {
        var keyCode = valor.charCodeAt(i);
        if (keyCode !== 8 && keyCode !== 46 && keyCode !== 0 && (keyCode < 48 || keyCode > 57)) {
            input.value = "";
            input.focus();
        }
    }

    if (valor < 0 || valor > 100) {
        MensajeToast("Validación de campo", "La cantidad debe ser mayor o igual a 0 y menor o igual a 100.", "error");
        input.focus();
    }

}

function emptyForValue(text, newText) {
    return text == "" || text == 0 ? newText : text;
}

function disabledBtn(btn) {
    $(btn).attr("disabled", true);
    $(btn).removeClass("btn-primary").addClass("btn-disabled");
    $(btn).css("cursor", "not-allowed");
    $(btn).prop('onclick', null).off('click');
}

//Solo ingresa números enteros
function onlyNumbers(event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode !== 8 && keyCode !== 0 && (keyCode < 48 || keyCode > 57)) {
        return false;
    }
}

//Sólo números onBlur
function valNumeric(obj) {
    var input = document.getElementById(obj);
    var valor = input.value;
    var bandera = false;
    for (i = 0; i < valor.length; i++) {
        var keyCode = valor.charCodeAt(i);
        if (keyCode !== 8 && keyCode !== 0 && (keyCode < 48 || keyCode > 57)) {
            bandera = true;
        }
    }

    if (bandera) {
        MensajeToast("Validación de campo", "Ingrese solo números enteros.", "error");
        input.value = "";
        input.focus();
    }
}

//Username con almenos 1 letra
function validarUsername(element) {
    var input = document.getElementById(element);
    //var regx = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    if (input.value != "") {
        var regx = /^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        if (!regx.test(input.value)) {
            MensajeToast("Validación de campo", "El nickname debe contener al menos 1 letra.", "error");
            input.focus();
            return false;
        }
    }
}

//letras y numeros
function validarletrasnumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 0 || tecla == 9) { return true; }
    if (tecla == 8 || tecla == 241 || tecla == 209) { return true; }
    patron = /\w/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

//Input file
function input_file() {   
    $(".input-file").after(
		function () {
		    if (!$(this).next().hasClass('input-ghost')) {
		        var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
		        element.attr("id", $(this).attr("name"));
		        element.change(function () {
		            element.prev(element).find('input').val((element.val()).split('\\').pop());
		        });
		        $(this).find("span.btn-choose").click(function () {
		            element.click();
		        });
		        $(this).find('input').css("cursor", "pointer");
		        $(this).find('input').mousedown(function () {
		            $(this).parents('.input-file').next().click();
		            return false;
		        });
		        return element;
		    }
		}
	);
}

//Control de archivos
function LimitAttach(tField, iType) {
    file = tField.value;

    //Tipos permitidos
    if (iType === 1) {
        //Imaganes
        extArray = new Array(".jpeg", ".jpg", ".png");
    }
    if (iType === 2) {
        //Documentos
        extArray = new Array(".doc", ".docx", ".xlsx", ".xls", ".pdf");
    }
    if (iType === 3) {
        //Documentos e imagenes
        extArray = new Array(".doc", ".docx", ".xlsx", ".xls", ".pdf", ".jpeg", ".jpg", ".png");
    }
    //Validación de tipos
    allowSubmit = false;
    if (!file) return;
    while (file.indexOf("\\") !== -1) file = file.slice(file.indexOf("\\") + 1);
    ext = file.slice(file.indexOf(".")).toLowerCase();
    for (var i = 0; i < extArray.length; i++) {
        if (extArray[i] === ext) {
            allowSubmit = true;
            break;
        }
    }

    //Para validar peso agregar (&& tField.files[0].size <= 128000000) la cantidad expresada en bytes
    if (allowSubmit) { 
        //if (tField.files && tField.files[0]) {
        //    var reader = new FileReader();
        //    reader.onload = function (e) {
        //        if (iType === "Imagenes") {
        //            $('#avatar_image').attr('src', e.target.result);
        //        }
        //    }
        //    reader.readAsDataURL(tField.files[0]);
        //}
        return "OK";
    } else {
        tField.value = "";
        var texto = 'Usted sólo puede subir archivos con extensiones <span style="color:#F0AD4E">';
        texto += extArray.join(" ") + '</span></br>Por favor seleccione un archivo correcto.';
        swal({
            title: 'Ocurrió un error.',
            text: texto,
            type: 'error',
            html: true
        });
        return "";
    }
}

//Obtener extensiones
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
