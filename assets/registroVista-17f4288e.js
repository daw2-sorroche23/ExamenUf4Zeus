import { s as supabase } from "./main-b36dff0e.js";
class User {
  // Mapping de propiedades de la tabla perfiles
  constructor(id = null, email = null, password = null) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(userData) {
    const { data, error } = await supabase.auth.signUp(userData);
    if (error) {
      throw new Error(error.message);
    }
    console.log("usuario creado correctamente ", data);
    return new User(data.user.id, data.user.email);
  }
  // login
  static async login(userData) {
    const { data, error } = await supabase.auth.signInWithPassword(userData);
    if (error) {
      throw new Error(error.message);
    }
    return new User(data.user.id, data.user.email);
  }
  // logout
  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // leer user logeado
  static async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user)
      return new User(user.id, user.email);
  }
  // actualizar usuario (NO SE COMO USARLO DE MOMENTO)
  async update(nuevosDatos) {
    const { data, error } = await supabase.auth.updateUser({
      email: this.email,
      password: this.password
    });
    if (error) {
      throw new Error(error.message);
    }
  }
}
class Perfil {
  // Mapping de propiedades de la tabla perfiles
  constructor(id = null, created_at = null, nombre = null, apellidos = null, user_id = null) {
    this.id = id;
    this.created_at = created_at;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.user_id = user_id;
  }
  // leer todos en orden descendiente a como se han creado
  static async getAll() {
    const { data: perfiles, error } = await supabase.from("perfiles").select("*").order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return perfiles.map(({ id, created_at, nombre, apellidos, user_id }) => {
      return new Perfil(id, created_at, nombre, apellidos, user_id);
    });
  }
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById(id) {
    const { data: perfil, error } = await supabase.from("perfiles").select("*").eq("id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Perfil(perfil.id, perfil.created_at, perfil.nombre, perfil.apellidos, perfil.user_id);
  }
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId(id) {
    const { data: perfil, error } = await supabase.from("perfiles").select("*").eq("user_id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Perfil(perfil.id, perfil.created_at, perfil.nombre, perfil.apellidos, perfil.user_id);
  }
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(perfilData) {
    const { error } = await supabase.from("perfiles").insert(perfilData).select();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // actualizar
  async update() {
    const { error } = await supabase.from("perfiles").update({
      nombre: this.nombre,
      apellidos: this.apellidos
    }).eq("id", this.id).single();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // actualizar
  async block() {
    const { error } = await supabase.from("perfiles").update({
      bloqueado: this.bloqueado
    }).eq("id", this.id).single();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // borrar
  static async delete(id) {
    const { error } = await supabase.from("perfiles").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
const registroVista = {
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
    document.querySelector("#form_registro").addEventListener("submit", async function(e) {
      e.preventDefault();
      try {
        const usuario = {
          email: document.querySelector("#emailR").value,
          pass: document.querySelector("#passR").value
        };
        const nuevoUser = await User.create(usuario);
        const perfilData = {
          user_id: nuevoUser.id
          // Tomamos el id que nos devuelve el registro
        };
        await Perfil.create(perfilData);
        alert("Usuario creado con éxito");
        window.location.href = "/ExamenUf4Zeus/#/login";
      } catch (error) {
        console.log(error);
        alert("Error al crear usuario");
      }
    });
  }
};
export {
  registroVista as default
};
