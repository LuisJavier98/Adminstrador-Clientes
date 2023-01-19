import { Form, redirect, useNavigate } from "react-router-dom"
import { eliminarCliente } from "../data/Clientes"

export async function action({ params }) {
  await eliminarCliente(params.clienteId)
  return redirect('/')
}


const Cliente = ({ cliente }) => {
  const navigate = useNavigate()
  const { nombre, empresa, email, telefono, id } = cliente
  return (
    <tr className=" border-solid border-black border-4">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p >{empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600 text-lg"><span className="text-gray-800 uppercase font-bold ">Email:</span>{email} </p>
        <p className="text-gray-600 text-lg"><span className="text-gray-800 uppercase font-bold ">Tel:</span>{telefono} </p>
      </td>
      <td className="p-6 flex gap-3 justify-center items-center">
        <button onClick={() => navigate(`/clientes/${id}/editar`)} type="button" className="text-blue-500 hover:text-blue-800 uppercase font-bold text-lg cursor-pointer border-0  "> Editar</button>
        <Form
          method="post"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => { if (!confirm('Deseas eliminar este registro?')) { e.preventDefault } }}>
          <button type="submit" className="text-red-500 hover:text-red-800 uppercase font-bold text-lg border-0 cursor-pointer">Eliminar</button>
        </Form>

      </td>
    </tr>
  )
}

export default Cliente
