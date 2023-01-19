import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import Error from "../components/Error"
import Formulario from "../components/Formulario"
import { actualizarCliente, obtenerCliente } from "../data/Clientes"

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }
  return cliente
}
export async function accion({ request, params }) {
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
  await actualizarCliente(params.clienteId, data)
  return redirect('/')
}

const EditarCliente = () => {
  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-gray-900">Editar cliente</h1>
      <p className="mt-3 md:text-2xl text-xl">A continuacion podras modificar los datos de un cliente </p>
      <div className="flex justify-end">
        <button onClick={() => navigate('/')} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-3 cursor-pointer font-bold uppercase">Volver</button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 box-border">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method='post' noValidate>
          <Formulario cliente={cliente} />
          <input type="submit"
            className="mt-5 w-full bg-gray-800 hover:bg-gray-700 p-3 uppercase font-bold box-border cursor-pointer text-white text-lg" value='EDITAR CLIENTE' />
        </Form>

      </div>
    </>
  )
}

export default EditarCliente