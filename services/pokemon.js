import pokemonsGql from '../apollo/queries/pokemons'

export default class Pokemon {
  constructor(apollo) {
    this.apollo = apollo
  }

  async getPokemons() {
    try {
      const { pokemons } = await this.apollo.query(pokemonsGql, { first: 50 })
      return pokemons
    } catch (e) {
      throw new Error("Couldn't get pokemons.")
    }
  }
}
