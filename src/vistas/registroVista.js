import { Perfil } from "../bd/perfil"
import { User } from "../bd/user"

export default {
    template: `    <div class="pt-5">
      <h1 class="w-100 text-center">Registro</h1>
      <form id ='form_registro' action="" class="form p-4 border shadow bordered mt-5 mx-auto" style="width: 400px;" novlidate>
        <label for="email" class="mt-2 form-label">User: </label>
        <input id ='emailR' type="text" class="form-control" placeholder="usuario@mail.com requiered">
  
        <label for="pass" class="mt-2 form-label">Contraseña: </label>
        <input id ='passR' type="password" class="form-control" value="">

        <button type="submit" class="mt-4 w-100 btn btn-primary">
            Enviar
        </button>
      </form>
    </div>`,

    script: () => {
        document.querySelector('#form_registro').addEventListener('submit', async function (e) {
          e.preventDefault()
          try {
            // Objeto con datos para el registro de user
            const usuario = {
              email: document.querySelector('#emailR').value,
              pass: document.querySelector('#passR').value
            }
            const nuevoUser = await User.create(usuario)
            // Objeto con datos para perfil
            const perfilData = { 
              user_id: nuevoUser.id, // Tomamos el id que nos devuelve el registro
            }
            await Perfil.create(perfilData)
            alert('Usuario creado con éxito')
            // Cargamos la página login
            window.location.href = '/ExamenUf4Zeus/#/login'
          } catch (error) {
            console.log(error)
            alert('Error al crear usuario')
          }
        })
      }
  }