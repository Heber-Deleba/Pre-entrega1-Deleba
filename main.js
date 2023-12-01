



//Constantes para elementos DOM

const camisetasContenedor = document.getElementById ("camisetasContenedor");
const verCarrito = document.getElementById ("verCarrito");
const carritoContainer = document.getElementById ("carrito-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");


//Guardado en Local storage

let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];

const getCamisetas = async () =>{
const response = await fetch ("productos.json");
const data = await response.json();



//Cartas de productos

data.forEach ((modelos) => {
    let contenido = document.createElement ("div");
    contenido.innerHTML = `
    <img src ="${modelos.img}">
    <h3>${modelos.nombre}</h3>
    <h4>$${modelos.precio}</h4>
    `;
    camisetasContenedor.append (contenido);

    let boton = document.createElement ("button");
    boton.innerText = "comprar";
    boton.className = "boton";
    contenido.append (boton)



//Evento cartas de productos

contenido.addEventListener("click" , () => {

const repeat = carrito.some ((repeatProduct) => repeatProduct.id ===  modelos.id);
console.log (repeat);

if (repeat){
carrito.map ((mod) => {
    if (mod.id === modelos.id){
        mod.cantidad++;
    }
});
    }else {
        carrito.push({
            id : modelos.id,
            nombre : modelos.nombre,
            precio : modelos.precio,
            img : modelos.img,
            cantidad : modelos.cantidad,
        });
    }

        console.log(carrito);
        carritoCounter();
        guardado();
        
    });
});

};

getCamisetas();




//Abrir carrito

const pintarCarrito = () => {
    carritoContainer.innerHTML ="";
    carritoContainer.style.display ="flex";
    const estructuraCarrito = document.createElement ("div");
    estructuraCarrito.className = "estructura-carrito";
    estructuraCarrito.innerHTML =`
    <h1 class="carrito-titulo">Carrito</h1>
    `;
    carritoContainer.append(estructuraCarrito);

//Salir del carrito
    const carritoBoton = document.createElement ("h1");
    carritoBoton.innerText = "Salir";
    carritoBoton.className = "carrito-boton";
    carritoBoton.addEventListener ("click" , () =>{
        carritoContainer.style.display = "none"
    })

    estructuraCarrito.append (carritoBoton);
    



//Contenido del carrito

carrito.forEach((modelos) => {
    const carritoContenido = document.createElement ("div");
        carritoContenido.className = "carrito-contenido";
        carritoContenido.innerHTML = `
        <img src ="${modelos.img}">
        <h3>${modelos.nombre}</h3>
        <h4>$${modelos.precio}</h4>
        <span class="restar">-</span>
        <p>Cantidad: ${modelos.cantidad}</p>
        <span class="sumar">+</span>
        <p>Total: $${modelos.cantidad * modelos.precio}</p>
        <span class="eliminar-producto">ELIMINAR</span>
        `
        ;

    carritoContainer.append(carritoContenido);

//Evento para restar cantidad

    let restar = carritoContenido.querySelector(".restar");
    restar.addEventListener ("click",() =>{
        if(modelos.cantidad !== 1){
        modelos.cantidad--;
        }

        guardado();
        pintarCarrito();
    })

//Evento para sumar cantidad

    let sumar = carritoContenido.querySelector (".sumar");
    sumar.addEventListener("click", () =>{
        modelos.cantidad++;
        guardado();
        pintarCarrito();
})

    console.log(carrito.length);

//Evento para elminar producto

    let eliminar = carritoContenido.querySelector(".eliminar-producto");
    eliminar.addEventListener("click", () =>{
        eliminarProducto(modelos.id);

//SweetAlert eliminar producto
        Swal.fire("Producto Eliminado!");


    });
    
});



//Suma de los productos

    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `
    <h1>Total a Pagar =$ ${total}</h1>
    `;
    carritoContainer.append (totalCompra);


    const btnPagar = document.createElement ("button");
    btnPagar.className = "btn-pagar"
    btnPagar.innerHTML=`PAGAR`
    ;

    carritoContainer.append (btnPagar);


    const sweetPagar = document.querySelector (".btn-pagar");
    sweetPagar.addEventListener ("click", () => {
        //verificar si hay productos en el carrito
        if (carrito.length > 0) {
        Swal.fire({
            title: "Desea confirmar el pago?",
            text: "Si la respuesta es negativa oprima Cancelar!",
            icon: "warning",
            iconColor: "#ff0000",
            showCancelButton: true,
            confirmButtonColor: "#000000",
            cancelButtonColor: "#ff0000",
            confirmButtonText: "Si, Pagar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: "Felicitaciones!",
                text: "su compra ha sido realizada con exito.",
                icon: "success",
                iconColor: "#ff0000"
            }).then(() => {
                vaciarCarrito(); 
            });
            }
        });
    } else {
        // Si no hay productos en el carrito, mostrar un mensaje informativo
        Swal.fire({
            title: "Carrito vacío",
            text: "Agrega productos al carrito antes de realizar el pago.",
            icon: "info",
            iconColor: "#ff0000"
        });
    }


        const confirmarPago = document.querySelector (".swal2-confirm");
        confirmarPago.addEventListener ("click", () =>{
            carritoContainer.style.display = "none"
        })
    });

    estructuraCarrito.append (confirmarPago);


    

    
    
};








//Evento abrir carrito

    verCarrito.addEventListener ("click", pintarCarrito);



//Eliminar productos del Local Storage.
    const eliminarProducto = (id) => {
        const foundId = carrito.find ((element) => element.id === id);

        console.log (foundId);

        carrito = carrito.filter ((carritoId) => {
            return carritoId !== foundId;
        });

        

    guardado();
    carritoCounter();
    pintarCarrito ();

};


// Función para contar productos en el carrito

    carritoCounter = () =>{
        cantidadCarrito.style.display = "block";
        const carritoLength = carrito.length;
        localStorage.setItem ("carritoLength", JSON.stringify(carritoLength));
        cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    };

//Llamada inicial a la función carritoCounter

    carritoCounter();


//Funcion para el guardado en Local Storage
    const guardado = () => {
    localStorage.setItem("carrito", JSON.stringify (carrito));
    };



//SweetAlert carta de productos

    const sweetAlert = document.querySelector ("#camisetasContenedor");
    sweetAlert.addEventListener ("click", () =>{
        Swal.fire({
            position: "center",
            icon: "info",
            iconColor: "#ff0000",
            title: "Agregado al Carrito",
            showConfirmButton: false,
            timer: 900,
        });
    });



//vaciar carrito al pagar
    const vaciarCarrito = () => {
        carrito = []; 
        guardado(); 
        carritoCounter(); 
        pintarCarrito(); 
    };



    

























/*



//PRODUCTOS
const camisetas = [

const vaciarCarrito = carritoContainer.querySelector ("btn-pagar");
        vaciarCarrito.addEventListener ("click", () =>{
            eliminarProducto(modelos.id)
        });

    {
        id: 1,
        nombre: "CAMISETA AC MILAN TITULAR '06",
        precio: 200,
        boton : "comprar",
        img: "https://camisgo.com/wp-content/uploads/2023/05/milan-06-07-300x400.jpg",
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "CAMISETA BARCELONA TITULAR '05",
        precio: 200,
        boton : "comprar",
        img: "https://camisgo.com/wp-content/uploads/2023/05/barca-05-06-1-300x400.png",
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "CAMISETA ATLETICO MADIRD TITULAR '94",
        precio: 180,
        boton : "comprar",
        img: "https://camisgo.com/wp-content/uploads/2023/05/atm-94-95-300x400.png",
        cantidad: 1,
    },
    
];

//LOGICA

const camisetasContenedor = document.getElementById ("camisetasContenedor");
const verCarrito = document.getElementById ("verCarrito");
const carritoContainer = document.getElementById ("carrito-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");

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

const repeat = carrito.some ((repeatProduct) => repeatProduct.id ===  modelos.id);
console.log (repeat);

if (repeat){
carrito.map ((mod) => {
    if (mod.id === modelos.id){
        mod.cantidad++;
    }
});
    }else {
        carrito.push({
            id : modelos.id,
            nombre : modelos.nombre,
            precio : modelos.precio,
            img : modelos.img,
            cantidad : modelos.cantidad,
        });
    }

        console.log(carrito);
        carritoCounter();
        guardado();
        
    });
});

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
    <span class="restar">-</span>
    <p>Cantidad: ${modelos.cantidad}</p>
    <span class="sumar">+</span>
    <p>Total: $${modelos.cantidad * modelos.precio}</p>
    <span class="eliminar-producto">ELIMINAR</span>
    `
    ;
    carritoContainer.append(carritoContenido);

    let restar = carritoContenido.querySelector(".restar");
    restar.addEventListener ("click",() =>{
        if(modelos.cantidad !== 1){
        modelos.cantidad--;
        }
        guardado();
        pintarCarrito();
    })

let sumar = carritoContenido.querySelector (".sumar");
sumar.addEventListener("click", () =>{
    modelos.cantidad++;
    guardado();
    pintarCarrito();
})

    console.log(carrito.length);


    let eliminar = carritoContenido.querySelector(".eliminar-producto");
    eliminar.addEventListener("click", () =>{
        eliminarProducto(modelos.id);
    });
    
});



//DOM suma de los productos
    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `Total a Pagar =$ ${total}`;
    carritoContainer.append (totalCompra);
};


//Evento abrir carrito
verCarrito.addEventListener ("click", pintarCarrito);


//Eliminar productos del Local Storage.
const eliminarProducto = (id) => {
    const foundId = carrito.find ((element) => element.id === id);

    console.log (foundId);

    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId;
    });

    guardado();
    carritoCounter();
    pintarCarrito ();

}

carritoCounter = () =>{
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem ("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();


//Guardado en Local Storage
const guardado = () => {
localStorage.setItem("carrito", JSON.stringify (carrito));
};



//Libreria


const sweetAlert = document.querySelector ("#camisetasContenedor");
sweetAlert.addEventListener ("click", () =>{
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Agregado al Carrito",
        showConfirmButton: false,
        timer: 900,
    });
});





// Constantes para los elementos del DOM
const camisetasContenedor = document.getElementById("camisetasContenedor");
const verCarrito = document.getElementById("verCarrito");
const carritoContainer = document.getElementById("carrito-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

// Guardado en el Local Storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para obtener camisetas desde el archivo JSON
const getCamisetas = async () => {
    try {
        const response = await fetch("productos.json");
        const data = await response.json();
        renderCamisetas(data);
    } catch (error) {
        console.error("Error al obtener datos de productos:", error);
    }
};

// Función para renderizar cartas de productos
const renderCamisetas = (data) => {
    data.forEach((modelos) => {
        const contenido = document.createElement("div");
        contenido.innerHTML = `
            <img src="${modelos.img}">
            <h3>${modelos.nombre}</h3>
            <h4>$${modelos.precio}</h4>
        `;
        camisetasContenedor.append(contenido);

        const boton = document.createElement("button");
        boton.innerText = "comprar";
        boton.className = "boton";
        contenido.append(boton);

        contenido.addEventListener("click", () => handleCompra(modelos));
    });
};

// Función para manejar la compra de productos
const handleCompra = (modelos) => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === modelos.id);

    if (repeat) {
        carrito.map((mod) => {
            if (mod.id === modelos.id) {
                mod.cantidad++;
            }
        });
    } else {
        carrito.push({
            id: modelos.id,
            nombre: modelos.nombre,
            precio: modelos.precio,
            img: modelos.img,
            cantidad: modelos.cantidad,
        });
    }

    carritoCounter();
    guardado();
};

// Función para renderizar el contenido del carrito
const pintarCarrito = () => {
    carritoContainer.innerHTML = "";
    carritoContainer.style.display = "flex";

    // Estructura del carrito
    const estructuraCarrito = document.createElement("div");
    estructuraCarrito.className = "estructura-carrito";
    estructuraCarrito.innerHTML = `<h1 class="carrito-titulo">Carrito</h1>`;
    carritoContainer.append(estructuraCarrito);

    // Botón para cerrar el carrito
    const carritoBoton = document.createElement("h1");
    carritoBoton.innerText = "Salir";
    carritoBoton.className = "carrito-boton";
    carritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "none";
    });
    estructuraCarrito.append(carritoBoton);

    // Contenido del carrito
    carrito.forEach((modelos) => {
        const carritoContenido = document.createElement("div");
        carritoContenido.className = "carrito-contenido";
        carritoContenido.innerHTML = `
            <img src="${modelos.img}">
            <h3>${modelos.nombre}</h3>
            <h4>$${modelos.precio}</h4>
            <span class="restar">-</span>
            <p>Cantidad: ${modelos.cantidad}</p>
            <span class="sumar">+</span>
            <p>Total: $${modelos.cantidad * modelos.precio}</p>
            <span class="eliminar-producto">ELIMINAR</span>
        `;

        // Evento para restar cantidad
        const restar = carritoContenido.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (modelos.cantidad !== 1) {
                modelos.cantidad--;
            }
            guardado();
            pintarCarrito();
        });

        // Evento para sumar cantidad
        const sumar = carritoContenido.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            modelos.cantidad++;
            guardado();
            pintarCarrito();
        });

        // Evento para eliminar producto
        const eliminar = carritoContenido.querySelector(".eliminar-producto");
        eliminar.addEventListener("click", () => {
            eliminarProducto(modelos.id);
            Swal.fire("Producto Eliminado!");
        });

        carritoContainer.append(carritoContenido);
    });

    // Total de la compra
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `Total a Pagar =$ ${total}`;
    carritoContainer.append(totalCompra);
};

// Evento para abrir el carrito
verCarrito.addEventListener("click", pintarCarrito);

// Función para eliminar productos del Local Storage
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => carritoId !== foundId);
    guardado();
    carritoCounter();
    pintarCarrito();
};

/ Función para contar productos en el carrito
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

/ Llamada inicial a la función carritoCounter
carritoCounter();

// Función para guardar en el Local Storage
const guardado = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Librería SweetAlert
const sweetAlert = document.querySelector("#camisetasContenedor");
sweetAlert.addEventListener("click", () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Agregado al Carrito",
        showConfirmButton: false,
        timer: 900,
    });
});

// Llamada a la función para obtener camisetas al cargar la página
getCamisetas();
*/