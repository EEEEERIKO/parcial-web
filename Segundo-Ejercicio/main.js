function sumarCuadros(arrayNumeros) {
    var sumaTotal = 0;
    var guiones = "";



    for (var i = 0; i < arrayNumeros.length; i++) {
        var numero = arrayNumeros[i];
        var guiones = "";
        for (var j = 0; j < numero.toString().length; j++) {
            guiones += "-";
        }
        console.log("+", guiones, "+");
        console.log("|", numero, "|");
        console.log("+", guiones, "+");
        console.log("")

        sumaTotal += numero;
    }

    var guionesSuma = "";
    for (var k = 0; k < sumaTotal.toString().length; k++) {
        guionesSuma += "-";
    }
    console.log("+", guionesSuma, "+");
    console.log("|", sumaTotal, "|");
    console.log("+", guionesSuma, "+");

}

var arrayNumeros = [1, 23, 453, 3267, 12354, 123456];
sumarCuadros(arrayNumeros);