export const paginationLogic = (currentPage, pokemonsByName) => {
  const POKEMONS_PER_PAGE = 12
  const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
  const sliceEnd = sliceStart + POKEMONS_PER_PAGE
  const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)
  const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1
  const PAGES_PER_BLOCK = 5
  const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)
  const pagesInbLock = []
  const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
  const maxPage = actualBlock * PAGES_PER_BLOCK
  for(let i = minPage; i <= maxPage; i++){
    if(i <= lastPage){
      pagesInbLock.push(i)
    }
  }
  return {pokemonInPage, lastPage, pagesInbLock}
}

