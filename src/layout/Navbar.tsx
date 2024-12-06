import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"




function Navbar() {
 

  return (
    <div>
    <nav className="">
        <ul>
            <li>ContentVerse</li>
            <li><Input type="search" placeholder="Search..." /></li>
            <li>FAQ</li>
            <li><Github /></li>
            <li><a href="#">Documentation.</a></li>
        </ul>
    </nav>
    </div>
  )
}

export default Navbar
