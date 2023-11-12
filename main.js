
// ---------------3er PRE ENTREGA-----------------


//PRODUCTOS
const camisetas = [
    {
        id: 1,
        nombre: "CAMISETA AC MILAN TITULAR '06",
        precio: 200,
        boton : "comprar",
        img: "file:///C:/Users/deleb/OneDrive/Escritorio/comision-43050/img/milan.jpg",
    },
    {
        id: 2,
        nombre: "CAMISETA BARCELONA TITULAR '05",
        precio: 200,
        boton : "comprar",
        img: "file:///C:/Users/deleb/OneDrive/Escritorio/comision-43050/img/barca-05.png",
    },
    {
        id: 3,
        nombre: "CAMISETA ATLETICO MADIRD TITULAR '94",
        precio: 180,
        boton : "comprar",
        img: "file:///C:/Users/deleb/OneDrive/Escritorio/comision-43050/img/atm-94.png",
    },
    
];

//LOGICA

const camisetasContenedor = document.getElementById ("camisetasContenedor");
const verCarrito = document.getElementById ("verCarrito");
const carritoContainer = document.getElementById ("carrito-container");

//Guardado en Local storage
let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];


//DOM cartas de productos
camisetas.forEach ((modelos) => {
    let contenido = document.createElement ("div");
    contenido.innerHTML = `
    <img src ="${modelos.img}">
    <h3>${modelos.nombre}</h3>
    <h4>${modelos.precio}</h4>
    `;
    camisetasContenedor.append (contenido);

    let boton = document.createElement ("button");
    boton.innerText = "comprar";
    boton.className = "boton";
    contenido.append (boton)



//Evento cartas de productos
    contenido.addEventListener("click" , () => {
        carrito.push({
            id : modelos.id,
            nombre : modelos.nombre,
            precio : modelos.precio,
            img : modelos.img,
        })
        console.log(carrito);
        guardado();
    })
})

//DOM abrir carrito
const pintarCarrito = () => {
    carritoContainer.innerHTML ="";
    carritoContainer.style.display ="flex";
    const estructuraCarrito = document.createElement ("div");
    estructuraCarrito.className = "estructura-carrito";
    estructuraCarrito.innerHTML =`
    <h1 class="carrito-titulo">Carrito</h1>
    `;
    carritoContainer.append(estructuraCarrito);

    const carritoBoton = document.createElement ("h1");
    carritoBoton.innerText = "Salir";
    carritoBoton.className = "carrito-boton";
    carritoBoton.addEventListener ("click" , () =>{
        carritoContainer.style.display = "none"
    })

    estructuraCarrito.append (carritoBoton);


//DOM contenido del carrito
carrito.forEach((modelos) => {
    const carritoContenido = document.createElement ("div");
    carritoContenido.className = "carrito-contenido";
    carritoContenido.innerHTML = `
    <img src ="${modelos.img}">
    <h3>${modelos.nombre}</h3>
    <h4>$${modelos.precio}</h4>
    `
    carritoContainer.append(carritoContenido);



//DOM eliminar producto
    let eliminar = document.createElement("span");
    eliminar.innerText = "ELIMINAR";
    eliminar.className = "eliminar-producto";
    carritoContenido.append (eliminar);
//Evento eliminar productos
    eliminar.addEventListener ("click", eliminarProducto);
})



//DOM suma de los productos
    const total = carrito.reduce ((acc, el) => acc + el.precio, 0);

    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `Total a Pagar =$ ${total}`;
    carritoContainer.append (totalCompra);
};


//Evento abrir carrito
verCarrito.addEventListener ("click", pintarCarrito);


//Eliminar productos del Local Storage.
const eliminarProducto = () => {
    const foundId = carrito.find ((element) => element.id);

    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId;
    });

    guardado();
    pintarCarrito ();
}


//Guardado en Local Storage
const guardado = () => {
localStorage.setItem("carrito", JSON.stringify (carrito));
};




















/*


//--------------------EVENTOS----------//

const alerta = document.querySelector ("#alerta");
alerta.addEventListener ("click" , mostrarAlerta);
function mostrarAlerta (){
    alert ("formulario enviado");
}














/-----------------DOM---------------------/
const contenidoIndex = document.querySelector (".hero");
const hero = document.querySelectorAll (".hero-titulo");
hero[0].innerText = "las mejores camisetardas"



const camisetas = ["boca","river","central"]
let lista = document.createElement ("ul");
lista.classList.add ("lista");
for (modelo of camisetas){
    lista.innerHTML += `<li class = "lista-item"> ${modelo}</li>`
}
contenidoIndex.append (lista);







/---------------------SEGUNDA PRE ENTREGA--------------------/


alert('BIENVENIDO A SAOKO');

function saludarCliente(nombre) {
    alert(`Hola ${nombre}`);
}

let nombre = prompt('Ingrese su nombre');
saludarCliente(nombre);

const camisetas = [
    { modelo: 'barcelona', precio: 32000 },
    { modelo: 'milan', precio: 32000 },
    { modelo: 'boca', precio: 30000 },
    { modelo: 'liverpool', precio: 31000 },
    { modelo: 'betis', precio: 30000 },
    { modelo: 'chelsea', precio: 33000 },
];

let carrito = [];

let comprar = prompt('¿Quieres comprar algunas de nuestras camisetas retro? Ingresa si o no.');

while (comprar !== 'si' && comprar !== 'no') {
    alert('Respuesta incorrecta');
    comprar = prompt('¿Quieres comprar algunas de nuestras camisetas retro? Ingresa si o no.');
}

if (comprar === 'si') {
    alert('Estos son nuestros modelos disponibles');
    let modelos = camisetas.map((camiseta) => `${camiseta.modelo} $${camiseta.precio}`);
    alert(modelos.join(' -- '));
} else if (comprar === 'no') {
    alert('Gracias, hasta luego!');
}

while (comprar !== 'no') {
    let camiseta = prompt('Agrega una camiseta a tu carrito!');
    let precio = 0;

    if (camiseta === 'barcelona' || camiseta === 'milan' || camiseta === 'boca' || camiseta === 'liverpool' || camiseta === 'betis' || camiseta === 'chelsea') {
        switch (camiseta) {
            case 'barcelona':
                precio = 32000;
                break;
            case 'milan':
                precio = 32000;
                break;
            case 'boca':
                precio = 30000;
                break;
            case 'liverpool':
                precio = 31000;
                break;
            case 'betis':
                precio = 30000;
                break;
            case 'chelsea':
                precio = 33000;
                break;
            default:
                break;
        }

        let unidades = parseInt(prompt('¿Cuántas camisetas desea llevar?'));
        carrito.push({ camiseta, unidades, precio });
        console.log(carrito);
        alert('Camiseta agregada al carrito con éxito.');
    } else {
        alert('No tenemos esa camiseta');
    }

    comprar = prompt('¿Quieres seguir comprando?');

    if (comprar === 'no') {
        alert('Gracias por su compra, hasta luego.');

        carrito.forEach((carritoFinal) => {
            const totalPorCamiseta = carritoFinal.unidades * carritoFinal.precio;
            alert(`Modelo: ${carritoFinal.camiseta} Unidades: ${carritoFinal.unidades} Total a pagar por la camiseta: ${totalPorCamiseta}`);
        });

        const total = carrito.reduce((acum, item) => acum + item.precio * item.unidades, 0);
        alert(`TOTAL: $${total}`);
    }
}









/-------------------PRIMER PRE ENTREGA---------------/



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
    

////////////////////////////////////////////////////////////













    const remeras=[
        {talle: "s", camiseta: "milan", precio: 200},
        {talle: "m", camiseta: "barcelona", precio: 200},
        {talle: "l", camiseta: "boca", precio:180},
    ]

    for (const item of remeras){
        console.log (item.talle);
        console.log (item.camiseta);
        console.log (item.precio);
    }
    


    //--------OOBJETOS--------//

    const usuario1 = {
        nombre : "heber",
        edad : 25,
        nacionalidad : "argentino",
        //hobbie : {
            //hobbie1 : "futbol",
            //hobbie2 : "rugby", //objeto dentro de objeto//
        //}
    }

    const usuario2 = {
        nombre : "messi",
        edad : 36,
        nacionalidad : "argentino" 
    }

    /usuario1.nacionalidad = "brasilera"; se pueden asignar propiedades en otra instacia del programa

    console.log (usuario1); 
    /console.log (usuario1.nombre);
    /console.log (usuario1 ["nombre"]); otra forma de llamar al valor//
    /console.log (usuario1.hobbie.hobbie2);
    

    /------FUNCIONES CONSTRUCTORAS------//

    

    function Producto (titulo, color, precio) {
        this.titulo = titulo;  //this: referenciar al producto que vamos a crear.Aca "this"reemplazaria a "producto1".//
        this.color = color;
        this.precio = precio;

}

const producto1 = new Producto ("sillon", "rojo", 50000);
console.log (producto1);


/----------CLASES---------//

class Producto {
    constructor (titulo, color, precio){
        this.titulo = titulo;
        this.color = color;
        this.precio = precio;
    }
}

const producto1 = new Producto ("sillon", "negro", 40000);
console.log (producto1);



/----------METODOS----------//

class Persona {
    constructor (nombre, edad, nacionalidad){
        this.nombre = nombre;
        this.edad = edad;
        this.nacionalidad = nacionalidad;

        this.saludar = function (){console.log ("hola soy" + " " + this.nombre)}; //metodo//
        this.cumpleanios = function () {this.edad++}  //metodo//
    }
}

const persona1 = new Persona ("heber", 25, "argentino");
const persona2 = new Persona ("messi", 36, "argentino");
//console.log (persona1);

//persona2.saludar ();
persona1.cumpleanios ();
console.log (persona1.edad);


/-------- OPERADOR IN-------//

class Persona {
    constructor (nombre, edad, nacionalidad){
        this.nombre = nombre;
        this.edad = edad;
        this.nacionalidad = nacionalidad;

        this.saludar = function (){console.log ("hola soy" + " " + this.nombre)}; //metodo//
        this.cumpleanios = function () {this.edad++}  //metodo//
    }
}

const persona1 = new Persona ("heber", 25, "argentino");

if ("nombre" in persona1){
    console.log (persona1.nombre);
}else {
    console.log ("no hay nombre");
}


/-------OPERADOR FOR IN--------//

class Persona {
    constructor (nombre, edad, nacionalidad){
        this.nombre = nombre;
        this.edad = edad;
        this.nacionalidad = nacionalidad;

        this.saludar = function (){console.log ("hola soy" + " " + this.nombre)}; //metodo//
        this.cumpleanios = function () {this.edad++}  //metodo//
    }
}

const persona1 = new Persona ("heber", 25, "argentino");

for (const propiedad in persona1){
    console.log (propiedad);
}



/---------ARRAYS----------//

const producto = ["sillon","silla", "mesa", "ropero"];
const numeros = [1, 2, 3, 4, 5];
const booleanos = [true, true, false];
const usuarios = [
    {
        nombre : "heber",
        edad : 25,
    },
    {
        nombre : "messi",
        edad : 36,
    }

];

/--------ACCEDIENDO A LOS ARRAYS--------//

//const producto = ["sillon","silla", "mesa", "ropero"];
//console.log (producto);
//console.log (producto [2]); //los indices arrancan en 0//

/--------RECORRIENDO A NUESTRO ARRAY-------//

const producto = ["sillon","silla", "mesa", "ropero"];
for ( let i = 0; i < 4; i++){
console.log (producto [i]);
}

/-------------------------------------------------FUNCIONES DE ALTO ORDEN--------------------------------------//
/-----------------ABSTRACCION---------------//
function sumarRango(min, max){
    let total = 0;
for (let i = min; i <= max; i++){
    total += i;
}
return total;
}


console.log (sumarRango(3,7));
let sumaEntreTresYSiete = sumarRango ( 3,7 );
console.log (sumaEntreTresYSiete);


/-----------RETORNO DE FUNCIONES------------//

function mayorQue (x){
    return (num) => num > x;
}

const mayorQueDiez = mayorQue (10);
const mayorQueVeinte = mayorQue (20);
console.log (mayorQue (9));



/---------METODOS DE BUSQUEDA Y TRANSFORMACION------------//

const numeros = [ 50, 12, 37, 17, 25, 6];
const animales = [ "perro", "gato", "cisne", "tortuga"];
const productos = [
    {nombre : "mesa", precio : 3500},
    {nombre : "silla de plastico", precio : 2000},
    {nombre : "silla de madera", precio : 2500},
    {nombre : "ventana", precio : 4500},
    {nombre : "puerta", precio : 3000},

];


//forEach>>>>> Recorre el array y ejecuta lo que le digamos con cada elemento.//

//numeros.forEach ((numero) => {
//console.log (numero);
//});

//find>>>>>>>  Recorre el array y retorna el primer elemento que cumpla con una funcion.//

//let productoElegido = prompt ("ingrese el producto que quiere comprar");
//console.log (productos.find((producto) => productos.nombre === productoElegido));

//filter>>>> recorre el array y retorna uno nuevo con todos los elementos que cumplan una condicion.//

//const sillas = productos.filter ((producto) => productos.nombre.include ("silla"));
//console.log ("sillas");


//some>>>>>> Recorre el array y responde true o false segun si encuentra o no un elemento que cumpla una condicion//

//const cisne = animales.some ((animal) => animal ==="cisne" );
//console.log (cisne);

//const caballo = animales.some ((animal) => animal === "caballo");
//console.log (caballo);

//map>>>>>>> Recorre el array y retorna uno nuevo con los elementos transformados del array original//

//const preciosActualizados = productos.map ((productos) =>{
    //return {
        //nombre : productos.nombre,
        //precio : productos.precio * 1.5
   // }
//});
//console.log (productos);
//console.log (preciosActualizados);


//reduce>>>>> Recorre el array y retorna un unico valor tras hacer una operacion sobre los elementos//

//const totalCarrito = productos.reduce ((acumulador ,productos) => acumulador + productos.precio , 0);
//console.log (totalCarrito);


//sort>>>>> Reordena el array segun el criterio que le indiques//
//numeros.sort ((a, b) => a - b);
//console.log (numeros);

const producto = ["sillon","silla", "mesa", "ropero"];
*/