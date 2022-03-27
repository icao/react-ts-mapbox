import { ChangeEvent, useContext, useRef } from 'react'
import { PlacesContext } from '../context'
import { SearchResults } from './SearchResults'

interface Props {
  placeholder?: string
}

export const SearchBar = ({ placeholder }: Props) => {
  const { searchPlaceByTerm } = useContext(PlacesContext)
  const debounceRef = useRef<NodeJS.Timeout>()

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      // TODO: buscar una location
      console.log('debounce: ', event.target.value)
      searchPlaceByTerm(event.target.value).then((data) => {
        console.log(data)
      })
    }, 500)
  }

  return (
    <div className="z-10 absolute top-10 left-10">
      <input
        type="text"
        className="bg-white outline-none rounded-md px-3 py-2 font-uber tracking-wide text-zinc-700 font-light w-80 border  hover:border-next-blue focus:border-next-blue shadow-black-medium hover:shadow-blue-next focus:shadow-blue-next"
        placeholder={placeholder}
        onChange={onQueryChange}
      />
      <SearchResults />
    </div>
  )
}
