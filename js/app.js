const marca = document.querySelector('#marca');
const puertas = document.querySelector('#puertas');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: ''
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos);

  llenarSelect();
})

marca.addEventListener('change', e => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener('change', e => {
  datosBusqueda.year = parseInt(e.target.value);

  filtrarAuto();
});

minimo.addEventListener('change', e => {
  datosBusqueda.minimo = e.target.value;

  filtrarAuto();
});

maximo.addEventListener('change', e => {
  datosBusqueda.maximo = e.target.value;
});

puertas.addEventListener('change', e => {
  datosBusqueda.puertas = Number(e.target.value);
});

transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});
//Funciones
function mostrarAutos(autos) {

  limpiarHTML();

  autos.forEach( auto => {
    const {marca, modelo, year, puertas, transmision, precio, color} = auto;
    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - color: ${color}
    `;

    // Insertar en el html
    resultado.appendChild(autoHTML)
  })
}

function limpiarHTML(){
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect(){
  for(let i=max; i>=min; i-- ){
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }

}
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}
function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

  //    console.log(resultado);
   if(resultado.length){
        mostrarAutos(resultado);
   } else {
       noResultado();
   }
}

function filtrarMarca(auto) {
  const {marca} = datosBusqueda;
  if(marca){
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const {year} = datosBusqueda;
  if(year){
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return  auto;
}
