import {Table,Column,Model,DataType,Default} from 'sequelize-typescript'

@Table({
    tableName: 'recipes'
})

class Recipe extends Model{
    @Column({
        type:DataType.STRING(50)
    })
    declare name: string
    @Column({
        type:DataType.INTEGER
    })
    declare quantity: number
    @Column({
        type:DataType.STRING(2000)
    })
    declare ingredients: string
    @Column({
        type:DataType.STRING(2000)
    })
    declare preparation: string
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare revised:boolean
}

export default Recipe