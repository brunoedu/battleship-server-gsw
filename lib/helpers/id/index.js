import mongoose from 'mongoose'

export default function NewId(){
    return mongoose.Types.ObjectId()
}