import {Table,Column,Model,DataType,Default} from 'sequelize-typescript'

@Table({
    tableName: 'recipes'
})

class Recipe extends Model{
    @Column({
        type:DataType.STRING(50)
    })
    declare recipe_name: string
    @Column({
        type:DataType.INTEGER
    })
    declare quantity: number
    @Column({
        type:DataType.STRING(2000)
    })
    declare recipe_ingredient: string
    @Column({
        type:DataType.STRING(2000)
    })
    declare recipe_preparation: string
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare revised:boolean
}

export default Recipe