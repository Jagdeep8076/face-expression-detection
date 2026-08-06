import { createContext, useState } from "react"

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    _id: {
      $oid: "6a73071da07caa3c83837bb7",
    },
    url: "https://ik.imagekit.io/tv1ht8lnp/Facebeat/facebeat/songs/LEVELS_UfjO8z…",
    posterUrl: "https://ik.imagekit.io/tv1ht8lnp/Facebeat/facebeat/posters/LEVELS_rLLE…",
    title: "LEVELS",
    mood: "happy",
  })

  const [loading, setLoading] = useState(false)

  return (
    <SongContext.Provider value={{ loading, setLoading, song, setSong }}>
      {children}
    </SongContext.Provider>
  )
}
