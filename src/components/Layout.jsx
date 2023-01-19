import { Outlet, Link, useLocation, NavLink } from "react-router-dom"

const Layout = () => {

  const location = useLocation()
  return (
    <div className="md:flex md:h-screen ">
      <aside className="md:w-1/4 bg-gray-900 px-5 py-10" >
        <h2 className="text-4xl font-black text-center text-white">CRM Clientes</h2>
        <nav className="mt-10">
          <Link className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 text-white no-underline`} to="/">Clientes</Link>
          <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 text-white no-underline`} to="/clientes/nuevo ">Nuevo cliente</Link>
        </nav>
      </aside>
      <main className="md:w-3/4 bg-gray-100 md:h-screen p-10 overflow-auto box-border">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
