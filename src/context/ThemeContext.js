import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  addSavedVideos: () => {},
  toggleTheme: () => {},
})

export default ThemeContext
