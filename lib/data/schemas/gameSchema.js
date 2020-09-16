import mongoose from 'mongoose'
import Config from '../../configurations'

const GameSchema = new mongoose.Schema({
    CreationDate: Date,
    Status: String,
    PlayerTurn: String,
    PlayerOne: Object,
    PlayerTwo: Object
})

export default mongoose.model(Config.DatabaseGameCollection, GameSchema, Config.DatabaseGameCollection)