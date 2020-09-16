import GameStatus from './gameStatus'
import Player from '../players'
import { DomainError } from '../../shared'

export default class Game {
    constructor(){
        this.CreationDate = new Date()
        this.Status = GameStatus.InProgress
        this.PlayerTurn = 'player1'
        this.PlayerOne = new Player('player1')
        this.PlayerTwo = new Player('player2')
        this.Winner = null
    }

    SetPlayerShips(playerId, ships){
        HandlePlayerTurn(this, playerId)

        const player = GetPlayerById(this, playerId)

        if(player.AreShipsSetted())
            throw new DomainError('Navios já foram posicionados para o jogador', 400)

        player.SetShips(ships)
        ToggleTurn(this)
    }

    PlayerShoot(playerId, position){
        HandlePlayerTurn(this, playerId)

        const otherPlayer = GetOtherPlayerById(this, playerId)
        otherPlayer.ReceiveShoot(position)
        
        HandleGameStatus(this)
        ToggleTurn(this)
    }
}

function HandleGameStatus(context){
    if(context.Status == GameStatus.Finished)
        return

    const playerTwoWins = context.PlayerOne.IsAllShipsDown()
    const playerOneWins = context.PlayerTwo.IsAllShipsDown()

    if(playerTwoWins)
        context.Winner = 'player2'

    if(playerOneWins)
        context.Winner = 'player1'
    
    if(playerOneWins || playerTwoWins)
        context.Status = GameStatus.Finished
}

function ToggleTurn(context){
    if(context.PlayerTurn == 'player1')
        context.PlayerTurn = 'player2'
    else
        context.PlayerTurn = 'player1'
}

function HandlePlayerTurn(context, playerId){ 
    if(context.PlayerTurn != playerId)
        throw new DomainError('Espere sua vez para efetuar uma ação')
}

function GetPlayerById(context, playerId){
    if(playerId == 'player1')
        return context.PlayerOne
    
    return context.PlayerTwo
}

function GetOtherPlayerById(context, playerId){
    if(playerId == 'player1')
        return context.PlayerTwo
    
    return context.PlayerOne
}