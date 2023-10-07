
function saludarCliente (nombre){
    alert (`bienvenido ${nombre}`);
}
let nombre = prompt ("ingrese su nombre");
saludarCliente (nombre);



let talle = prompt ("ingrese talle s,m,l,xl,xxl o volver");
    while (talle !="volver"){
    switch (talle){

            case "s":
            alert ("15 modelos disponibles");
            break;


            case "m":
            alert ("4 modelos disponibles");
            break;

            case "l":
            alert("7 modelos disponibles");
            break;

            case "xl":
            alert("12 modelos disponibles");
            break;

            case "xxl":
            alert ("1 modelo disponible");
            break;

            default:
            alert ("talle inexistente");
            break;


        }
        let edad = prompt("Que edad tienes?");
        if ( edad >=18){
            alert ("puedes comprar");
        }else{
            alert ("no puedes comprar");
        }
        talle = prompt ("ingrese talle s,m,l,xl,xxl o volver");
    }