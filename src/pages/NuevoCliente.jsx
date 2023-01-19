import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/Clientes"

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const email = formData.get('email')
  const errores = []
  if (Object.values(data).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)) {
    errores.push('El email no es valido')
  }

  if (Object.keys(errores).length) {
    console.log(Object.keys(errores))
    return errores
  }
  await agregarCliente(data)
  return redirect('/')
}


const NuevoCliente = () => {
  const errores = useActionData()
  const navigate = useNavigate()
  return (
    <>
      <h1 className="font-black text-4xl text-gray-700">Nuevo Cliente</h1>
      <p className="mt-3 md:text-2xl text-xl">Llena todos los campos para registrar un nuevo cliente </p>
      <div className="flex justify-end">
        <button onClick={() => navigate('/')} className=" bg-gray-800 hover:bg-gray-700 text-white px-3 py-3 cursor-pointer font-bold uppercase">Volver</button>

      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 box-border">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form
          method="post"
          noValidate
        >
          <Formulario />
          <input type="submit"
            className="mt-5 w-full bg-gray-800 hover:bg-gray-700 p-3 uppercase font-bold box-border cursor-pointer text-white text-lg" value='REGISTRAR CLIENTE' />
        </Form>

      </div>
    </>
  )
}

export default NuevoCliente
