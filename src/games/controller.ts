import { JsonController, Get, Body, Post, HttpCode } from 'routing-controllers'
import Game, { colorArr } from './entity';



// const moves = (board1, board2) => 
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length

@JsonController()
export default class GameController {

    @Get('/games') //get all the games
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games') //for creating a new game
    @HttpCode(201)
        createGame(@Body() game: Game) {
            const newColor = colorArr[Math.floor(Math.random() * colorArr.length)];
            game.color = newColor;
            return game.save();
        }
}