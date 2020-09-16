import { DomainError } from "../../shared"

export default class Position{
    constructor(line, column){
        this.Line = line
        this.Column = column
        HandlePositionValidation(line, column)
    }

    IsOverlappingPosition(position){
        return this.Line == position.Line && this.Column == position.Column
    }
}

function HandlePositionValidation(line, column){
    if(line < 0)
        throw new DomainError('Linha não pode ser menor do que 0')
    if(column < 0)
        throw new DomainError('Coluna não pode ser menor do que 0')
    if(line > 9)
        throw new DomainError('Linha não pode ser maior do que 9')
    if(column > 9)
        throw new DomainError('Coluna não pode ser maior do que 9')
}