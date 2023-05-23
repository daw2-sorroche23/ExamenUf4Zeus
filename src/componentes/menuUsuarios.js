import { User } from '../bd/user.js'
import { header } from './header.js'
export const menuUsuario = {
  template: `
<nav class="navbar navbar-light bg-light">
      <div id='menuUsuario' class="container-fluid">
        <a class="navbar-brand">Gestión de incidencias FPLLEFIA</a>
        <div>
          <button class="btn btn-secondary ms-2">PANEL</button>
          <a href="/ExamenUf4Zeus/#/login"><button class="btn btn-secondary ms-2">LOGIN</button></a>
          <a href="/ExamenUf4Zeus/#/registro/"><button class="btn btn-secondary ms-2">REGISTRO</button></a>
        </div>
        <div>
          <span>administrador@fpllefia.com</span>
        </div>
      </div>
    </nav>
  `
}