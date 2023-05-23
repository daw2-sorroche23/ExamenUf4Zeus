// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Ticket {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, coigo = null, grupo = null, aula = null, ordenador = null, descripcion = null, perfil_id = null) {
    this.id = id
    this.created_at = created_at
    this.coigo = coigo
    this.grupo = grupo
    this.aula = aula
    this.ordenador = ordenador
    this.descripcion = descripcion
    this.perfil_id = perfil_id
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return tickets.map(({ id , created_at , coigo , grupo , aula , ordenador , descripcion , perfil_id  }) => {
      return new Ticket(id , created_at , coigo , grupo , aula , ordenador , descripcion , perfil_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Ticket(ticket.id , ticket.created_at , ticket.coigo , ticket.grupo , ticket.aula , ticket.ordenador , ticket.descripcion , ticket.perfil_id)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Ticket(ticket.id , ticket.created_at , ticket.coigo , ticket.grupo , ticket.aula , ticket.ordenador , ticket.descripcion , ticket.perfil_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (perfilData) {
    const { error } = await supabase
      .from('tickets')
      .insert(perfilData)
      .select()
      // console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('tickets')
      .update({
        codigo: this.nombre,
        grupo: this.grupo,
        aula: this.aula,
        ordenador: this.ordenador,
        descripcion: this.descripcion
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async block () {
    const { error } = await supabase
      .from('tickets')
      .update({
        bloqueado: this.bloqueado
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
