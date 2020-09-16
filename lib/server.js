import app from './app'
import Configs from './configurations'

app.listen(Configs.Port, () =>{
    console.log(`Batalha naval server rodando na porta: ${Configs.Port}`)
})