# battleship-gsw-server
![Build Status](https://travis-ci.org/brunooliveira95/battleship-gsw-server.png)
#### Descrição
Jogo de batalha naval para dois jogadores desenvolvido em Node.Js (ES6) e MongoDB utilizando conceitos de Clean Architecture, Clean Code, Repository Pattern, TDD e DDD.

------------

#### Documentação da Api
Esta api possui quatro endpoints sendo eles:

##### POST: /game
- Endpoint responsável pela criação de um jogo, caso um jogo ativo já exista ele é retornado

##### GET: /game
- Endpoint que retorna o jogo ativo no momento, caso não exista nada é retornado

##### PUT: /game/ships
###### - Body
```json
{
	"playerId": "player1",
	"ships":[
        { "type": "carrier", "positions": [[0,0], [0,1], [0,2], [0,3], [0,4]]},
        { "type": "battleship", "positions": [[1,0], [1,1], [1,2], [1,3]]},
        { "type": "submarine", "positions": [[2,0], [2,1], [2,2]]},
        { "type": "destroyer", "positions": [[3,0], [3,1], [3,2]]},
        { "type": "cruiser", "positions": [[4,0], [4,1]]}
    ]
}
```
- Endpoint responsável pelo posicionamento dos navios dos jogadores, é preciso enviar no corpo da requisição o jogador que está posicionando os navios e os navios com seus respectivos tipos e posições. Caso o jogador não esteja no turno uma mensagem de erro é retornada, assim como no caso do jogador não enviar os navios válidos em relação aos tipos e posições

##### PUT: /game/shoot
###### - Body
```json
{
	"playerId": "player1",
	"position":[0,0]
}
```
- Endpoint que permite ao usuário enviar um tiro no campo de jogo inimigo, este endpoint também possui validação de turno de usuário e posição válida

##### Response dos endpoints
- Todos os endpoints retornam o objeto de jogo completo para gerenciamento dos estados posições no tabuleiro (AngularJs), segue abaixo este objeto:
```json
{
    "CreationDate": "2019-08-24T21:26:41.245Z",
    "Status": "in_progress",
    "PlayerTurn": "player1",
    "PlayerOne": {
        "Id": "player1",
        "Board": {
            "Carrier": {
                "Positions": [
                    {
                        "Line": 0,
                        "Column": 0
                    },
                    {
                        "Line": 0,
                        "Column": 1
                    },
                    {
                        "Line": 0,
                        "Column": 2
                    },
                    {
                        "Line": 0,
                        "Column": 3
                    },
                    {
                        "Line": 0,
                        "Column": 4
                    }
                ]
            },
            "Battleship": {
                "Positions": [
                    {
                        "Line": 1,
                        "Column": 0
                    },
                    {
                        "Line": 1,
                        "Column": 1
                    },
                    {
                        "Line": 1,
                        "Column": 2
                    },
                    {
                        "Line": 1,
                        "Column": 3
                    }
                ]
            },
            "Submarine": {
                "Positions": [
                    {
                        "Line": 2,
                        "Column": 0
                    },
                    {
                        "Line": 2,
                        "Column": 1
                    },
                    {
                        "Line": 2,
                        "Column": 2
                    }
                ]
            },
            "Destroyer": {
                "Positions": [
                    {
                        "Line": 3,
                        "Column": 0
                    },
                    {
                        "Line": 3,
                        "Column": 1
                    },
                    {
                        "Line": 3,
                        "Column": 2
                    }
                ]
            },
            "Cruiser": {
                "Positions": [
                    {
                        "Line": 4,
                        "Column": 0
                    },
                    {
                        "Line": 4,
                        "Column": 1
                    }
                ]
            },
            "Hits": [
                {
                    "Position": {
                        "Line": 0,
                        "Column": 0
                    },
                    "IsShipHit": true
                }
            ]
        }
    },
    "PlayerTwo": {
        "Id": "player2",
        "Board": {
            "Carrier": {
                "Positions": [
                    {
                        "Line": 0,
                        "Column": 0
                    },
                    {
                        "Line": 0,
                        "Column": 1
                    },
                    {
                        "Line": 0,
                        "Column": 2
                    },
                    {
                        "Line": 0,
                        "Column": 3
                    },
                    {
                        "Line": 0,
                        "Column": 4
                    }
                ]
            },
            "Battleship": {
                "Positions": [
                    {
                        "Line": 1,
                        "Column": 0
                    },
                    {
                        "Line": 1,
                        "Column": 1
                    },
                    {
                        "Line": 1,
                        "Column": 2
                    },
                    {
                        "Line": 1,
                        "Column": 3
                    }
                ]
            },
            "Submarine": {
                "Positions": [
                    {
                        "Line": 2,
                        "Column": 0
                    },
                    {
                        "Line": 2,
                        "Column": 1
                    },
                    {
                        "Line": 2,
                        "Column": 2
                    }
                ]
            },
            "Destroyer": {
                "Positions": [
                    {
                        "Line": 3,
                        "Column": 0
                    },
                    {
                        "Line": 3,
                        "Column": 1
                    },
                    {
                        "Line": 3,
                        "Column": 2
                    }
                ]
            },
            "Cruiser": {
                "Positions": [
                    {
                        "Line": 4,
                        "Column": 0
                    },
                    {
                        "Line": 4,
                        "Column": 1
                    }
                ]
            },
            "Hits": [
                {
                    "Position": {
                        "Line": 0,
                        "Column": 0
                    },
                    "IsShipHit": true
                }
            ]
        }
    },
    "Winner": null
}
```

------------

#### Testes, Build e Execução
Para executar os testes deste projeto basta executar o script
`$ npm test`

Para buildar o projeto utilizando babel execute o script
`$ npm run build`

Para executar o projeto em produção (incluindo build) execute
`$ npm start`

Para executar o projeto em modo de desenvolvimento com nodemon
`$ npm run dev`

------------

#### Live Demo
O deploy desta api foi feita na plataforma [Heroku](https://www.heroku.com "Heroku") com a opção de deploy automático habilitada na branch master deste repositório e utilizando também o resource de MongoDB da [mLab](https://www.mlab.com "mLab").

[API Endpoint](https://battleship-gsw-server.herokuapp.com/ "API Endpoint")
