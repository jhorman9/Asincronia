// //simulando la asincronia

// function task(message){
//     let n = 0;
//     while(n < 10000000) {
//         n++;
//     }
//     console.log(message);
// }

// console.log("iniciando la tarea");
// setTimeout(() => { //generando un proceso asincrono
//     task("archivo descargado");//esto genera un temporizador de 2 segundos
// },2000)
// console.log("proceso finalizado");

//TENEMOS EL EVENT LOOP

function cuadrado(numero, callback) {
    setTimeout(() => {
        callback(numero);
    }, Math.random() * 1000)
}

//callback GEL no es recomendable hacerlo

cuadrado(1, (valor) => {
    console.log(valor * valor);
    cuadrado(2, (valor) => { //otra funcion de callback
        console.log(valor*valor)
        cuadrado(3, (valor) =>{
            console.log(valor*valor) //lo va imprimiendo por orden uno por uno 
            cuadrado(4, (valor) => {
                console.log(valor*valor)
                cuadrado(5, (valor) => {
                    console.log(valor*valor);
                })
            })
        })
    })
} );

//Promesas - esto evita el callback GEL -- las promesas sustituyen a los callback
//retornabamos un valor o una funcion 

function miPromesa(numero) {
    if(typeof numero !== "number") {
        return Promise.reject("El argumento no es un numero")
    }
    return new Promise(resolve => { //resolve es cuando la promesa va bien, el reject es cuando la promesa falla
        setTimeout(() => {
            resolve(numero * numero)
        }, 2000)
    })
}

miPromesa(10)//100
.then((value) => console.log(value))//el then espera que la promesa se cumpla y lo devuelve si este .then no se usa devuelve una promesa pendiente
.catch((error) => console.log(error)) //catch es para atrapar el error 

//funcion Asincronas

async function asincrona() {
    const resultado = await miPromesa(20); //400
    console.log(resultado);
}

asincrona();

/////////

async function otra() {
    try{
        const resultado = await miPromesa(20); //400
        console.log(resultado);
    } catch (error) {
        console.log(error)
    }
}

otra()

const charactersArea = document.querySelector(".grilla")

//mediante fetch se hacen peticiones desde el http hacer consultas a otros servidores pr medio de una URL
//el FETCH 
fetch("http://hp-api.herokuapp.com/api/characters") //recibe un http como parametro, el FETCH devuelve una promesa
.then((response) => response.json())
.then(data => printCharacter(data));

function printCharacter(character) {
    newData = character.slice(0,20); // agregar al insertCharacter
    insertCharacters(character);
}

/*async function apis() {
    const allCharacters = await fetch("http://hp-api.herokuapp.com/api/characters");
    const all = await allCharacters.json();
    console.log(all.slice(0,20));
}

apis();
*/

function createCard(img, name) {
    return `
        <div class="hpCard">
        <div class="imgContainer">
            <img src="${img !== "" ? img : "https://www.cinemascomics.com/wp-content/uploads/2020/04/harry-potter-Trimeresurus-Salazar.jpg"}" alt="HarryPotter-Character">
        </div>
        <h2>${name}</h2>
    </div>    
    `
}

//LINK : http://hp-api.herokuapp.com/api/characters//

function insertCharacters(arr) {
    charactersArea.innerHTML = arr.map((character) => createCard(character.image, character.name)).join("")
}