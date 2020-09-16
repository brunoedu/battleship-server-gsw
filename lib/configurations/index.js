class Configs {
    get Env(){
        return process.env.NODE_ENV || 'DEV'
    }

    get Port(){
        return process.env.PORT || '3000'
    }

    get DatabaseUrl(){
        return process.env.DB_URL || 'mongodb://localhost:27017'
    }

    get DatabaseName(){
        return process.env.DB_NAME || 'battleship-gsw-db'
    }

    get DatabaseGameCollection(){
        return process.env.DB_GAME_COLLECTION || 'games'
    }

    get GameBoardRows(){
        return process.env.GAME_BOARD_ROWS || 10
    }

    get GameBoardCols(){
        return process.env.GAME_BOARD_COLS || 10
    }

    get CarrierShipSize(){
        return process.env.CARRIER_SHIP_SIZE || 5
    }

    get BattleshipShipSize(){
        return process.env.BATTLESHIP_SHIP_SIZE || 4
    }

    get SubmarineShipSize(){
        return process.env.SUBMARINE_SHIP_SIZE || 3
    }

    get DestroyerShipSize(){
        return process.env.DESTROYER_SHIP_SIZE || 3
    }

    get CruiserShipSize(){
        return process.env.CRUISER_SHIP_SIZE || 2
    }

    get AllShipsDownCount(){
        return process.env.ALL_SHIPS_DOWN_COUNT || 17
    }
}
export default new Configs()