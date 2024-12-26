import React from 'react'
import Header from '../header'
import AddClientForm from './addClientForm'

const AddClient = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Cadastro de Clientes'}
                        description={'Faça aqui o cadastro de todos os clientes.'}
                        addButton={true}
                        buttons={false}
                    />

                    <AddClientForm />
                </main>
            </div>
        </div>
    )
}

export default AddClient