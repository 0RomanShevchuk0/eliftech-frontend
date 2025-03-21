import { FC } from "react"
import { Link } from "@tanstack/react-router"
import { appRoutes } from "../config/routes.config"

const links = [
  { path: appRoutes.home, label: "Home" },
  { path: appRoutes.quizzes, label: "Quizzes" },
]

const Header: FC = () => {
  const LinkElements = links.map(({ path, label }) => (
    <li key={path} className="list-none">
      <Link
        to={path}
        className="text-black hover:text-[#a5b4fc] font-medium transition-colors duration-200"
        activeProps={{ style: { fontWeight: "bold", color: "#a5b4fc" } }}
      >
        {label}
      </Link>
    </li>
  ))

  return <div className="p-2 flex gap-4 justify-center">{LinkElements}</div>
}

export default Header
