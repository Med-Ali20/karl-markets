import Hero from './hero'
import Categories from './categories'
import ShowAllProducts from './allProducts'
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'

export default function Home() {
  useEffect(() => {
    const options = {
      autoConfig: true, 
      debug: false
  }
  
  ReactPixel.init('684774793231540', null, options)
  ReactPixel.pageView()

  },[])
  return (
    <div>
      <Hero />
      <ShowAllProducts />
      <Categories />
    </div>
  )
}
