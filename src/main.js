import { header } from "./componentes/header";
import { footer } from "./componentes/footer";
import { Ticket } from "./bd/ticket";
import { enrutador } from "./componentes/enrutador.js";

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


//Inyectamos el componente header
document.querySelector('header').innerHTML = header.template


enrutador.observadorRutas()
// Cargamos la página home
window.location = '#/home'