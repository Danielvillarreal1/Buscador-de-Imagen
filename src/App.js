import React, {useState, useEffect} from 'react';
import './App.css';
import Formulario from './components/formulario';
import ListadoImagen from './components/listado-imagen'
import ListadoImagenes from './components/listado-imagen';
function App() {

  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
   const consultarApi = async () => {
    if(busqueda === '' ) 
    return;
     
    const imagenesPorPagina = 30;
    const key = '17463672-c58b0652b25bee40dd69f6dc2';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
  
    const repuesta = await fetch(url)
    const resultado = await repuesta.json();

    guardarImagenes(resultado.hits);
    
    //calcular el total de paginas
    const calcularTotalPaginas= Math.ceil(resultado.totalHits / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);

    //Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior: 'smooth'})
  }
  consultarApi();
  }, [busqueda, paginaactual])

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual -1;

    if(nuevaPaginaActual === 0 ) 
    return;

    guardarPaginaActual(nuevaPaginaActual);
  }
  
  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1; 
    if(nuevaPaginaActual > totalpaginas ) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="led text-center">Buscador de Imagenes</p>
          
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
      </div>
      <div className="row justify-content-center">
          <ListadoImagenes
            imagenes={imagenes}
          />
            
        { (paginaactual === 1 ) ? null : (
              <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
        )}

           {(paginaactual === totalpaginas ) ? null : (
              <button
              type="button"
              className="btn btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
           )}

      </div>
     
    </div>
  );
}

export default App;
