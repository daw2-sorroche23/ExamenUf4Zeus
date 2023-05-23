// import { formEditarPerfil } from './formEditarPerfil'
import { User } from '../bd/user.js'
import { Perfil } from '../bd/perfil.js'
import { menuSuperior } from './menuSuperiro.js'
import { menuUsuario } from './menuUsuarios.js'



export const header = {
  template: `

    <!-- Menú superior -->
    ${menuSuperior.template}
    <!-- Menu usuario -->
    ${menuUsuario.template}
  </div>
</nav>

  `,
}
