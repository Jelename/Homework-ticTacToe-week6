import { JsonController, Get, Body, Post, HttpCode, Put, Param, NotFoundError, BadRequestError } from 'routing-controllers';
import Game, { colorArr } from './entity';

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    @Get('/games') //get all the games
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games') //create a new game
    @HttpCode(201)
        createGame(@Body() game: Game) {
            const newColor = colorArr[Math.floor(Math.random() * colorArr.length)]
            game.color = newColor
            return game.save()
        }

    @Put('/games/:id') //edit game
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
        ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find this game')

        const color = update.color
        if (color !== undefined && colorArr.indexOf(color) < 0) throw new BadRequestError('Choose another color')

        if (moves(game.board, update.board) > 1) throw new BadRequestError('You are allowed to make one move at a time')

        return Game.merge(game, update).save()
        }
}