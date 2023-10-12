class Prestamo{
    constructor(importe, tasa, cuotas, montoCuota, montoTotal, fechaVencimiento){
        this.importe = importe;
        this.tasa = tasa;
        this.cuotas = cuotas;
        this.montoCuota = montoCuota;
        this.montoTotal = montoTotal;
        this.fechaVencimiento = fechaVencimiento;
    }
}

calcularPrestamo();

function calcularPrestamo(){

    //Solicito importe, tasa, cantidad de cuotas
    const ahora = new Date();

    let importe = validarImporte();

    let tasa = validarTasa();
        
    let cuotas = validarCuotas();

    //calculo interes para obtener cuota mensual y total a pagar
    if(importe>0 && tasa>0 && cuotas>0){

        let interes = tasa/1200;
        let tasaInteres = calcularPotencia(interes + 1, cuotas);
        let montoCuota = importe * interes * tasaInteres / (tasaInteres - 1);
        let montoTotal = montoCuota * cuotas;

        //muestro el resultado
        const prestamos = [];
        prestamos.push(new Prestamo(importe, tasa, cuotas, montoCuota.toFixed(2), montoTotal.toFixed(2)));
        let mensaje;
        prestamos.forEach((prestamo) => {
        mensaje=`\nLa cuota mensual es de $${prestamo.montoCuota} y el monto total a pagar es $${prestamo.montoTotal}\n`;
        });

        //Muestro grilla de cuotas
        const  lstCuotas = [];
        for(let i = 0; i < cuotas; i++)
        {
         ahora.setMonth(ahora.getMonth() + 1)
         lstCuotas.push({ nroCuota:i+1, montoCuota:montoCuota.toFixed(2), fechaVencimiento:ahora.toLocaleDateString() });
        }

        let res = "\nGrilla de Cuotas: \n";
        lstCuotas.map((lstCuotas)=>{
            res += `\n NroCuota: ${lstCuotas.nroCuota} \n Monto: $${lstCuotas.montoCuota} \n Vto proxima cuota: ${lstCuotas.fechaVencimiento} \n`;
        });

        alert(mensaje + res);
    }
    else{
        alert("Por favor verifique los datos ingresados sean correctos");
    }
}

//Valido ingreso de datos
function validarImporte(){
    let dato=parseInt(prompt("Ingrese capital solicitado: "));
    if(isNaN(dato) || dato === 0){
        alert("El valor ingresado debe ser un numero y mayor que cero");
        return validarImporte();
    }
    return dato;
}

function validarTasa(){
    let dato=parseInt(prompt("Ingrese tasa de interes: "));
    if(isNaN(dato) || dato === 0){
        alert("El valor ingresado debe ser un numero y mayor que cero");
        return validarTasa();
    }
    return dato;
}

function validarCuotas(){
    let dato=parseInt(prompt("Ingrese cantidad de cuotas: "));
    if(isNaN(dato) || dato === 0){
        alert("El valor ingresado debe ser un numero y mayor que cero");
        return validarCuotas();
    }
    return dato;
}

//Calculo la potencia
function calcularPotencia(base, exponente){
    let resultado=1;
    for(let i=0; i < exponente; i++){
        resultado *= base;
    }
    return resultado;
}