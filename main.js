

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

//Evento para restar cantidad en carrito

    let restar = carritoContenido.querySelector(".restar");
    restar.addEventListener ("click",() =>{
        if(modelos.cantidad !== 1){
        modelos.cantidad--;
        }

        guardado();
        pintarCarrito();
    })

//Evento para sumar cantidad en carrito

    let sumar = carritoContenido.querySelector (".sumar");
    sumar.addEventListener("click", () =>{
        modelos.cantidad++;
        guardado();
        pintarCarrito();
})

    console.log(carrito.length);

//Evento para elminar producto en carrito

    let eliminar = carritoContenido.querySelector(".eliminar-producto");
    eliminar.addEventListener("click", () =>{
        eliminarProducto(modelos.id);

//SweetAlert eliminar producto
        Swal.fire("Producto Eliminado!");


    });
    
});



//Suma de los productos en carrito

    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `
    <h1>Total a Pagar =$ ${total}</h1>
    `;
    carritoContainer.append (totalCompra);

//Boton de pagar

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
                Swal.fire({
                    title: "Compra confirmada",
                    text: "¡Gracias por tu compra!",
                    icon: "success",
                    iconColor: "#ff0000"
                }).then(() => {
                    // Cerrar el carrito después de mostrar el mensaje
                    carritoContainer.style.display = "none";
                });
            });
            }
        });
    } else {
        // Si no hay productos en el carrito
        Swal.fire({
            title: "Carrito vacío",
            text: "Agrega productos al carrito antes de realizar el pago.",
            icon: "info",
            iconColor: "#ff0000"
        });
    }
    
    });

};




//vaciar carrito al pagar
const vaciarCarrito = () => {
    carrito = []; 
    guardado(); 
    carritoCounter(); 
    pintarCarrito(); 
};




//Evento abrir carrito

    verCarrito.addEventListener ("click", pintarCarrito);





// Función para contar productos en el carrito

    carritoCounter = () =>{
        cantidadCarrito.style.display = "block";
        const carritoLength = carrito.length;
        localStorage.setItem ("carritoLength", JSON.stringify(carritoLength));
        cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    };

//Llamada inicial a la función carritoCounter

    carritoCounter();



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





//Funcion para el guardado en Local Storage
const guardado = () => {
    localStorage.setItem("carrito", JSON.stringify (carrito));
    };
