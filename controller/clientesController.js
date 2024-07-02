const {Pool} = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'lab_commerce'
})

class ClientsController {

    async createUser(request, response){
        try{
            const dados = request.body()

            if(dsd){

            }
        }catch{
            
        }
    }
}