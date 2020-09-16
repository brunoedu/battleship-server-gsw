import Config from '../configurations'
import GameRepository from './repositories'
import mongoose from 'mongoose'

mongoose.connect(Config.DatabaseUrl, {
    useNewUrlParser: true, 
    dbName: Config.DatabaseName
}).catch(error =>{
    console.log("Falha ao conectar no banco")
    throw Error("Falha ao conectar no banco");
});  

export default new GameRepository()