import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';

export const colorArr = ['red', 'blue', 'green', 'yellow', 'magenta']

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

@Entity()
export default class Game extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    name: string

    //@IsString()
    //@IsIn(colorArr)
    @Column('text', {nullable:false})
    color: string

    @Column('json', {default:defaultBoard})
    board: JSON
}