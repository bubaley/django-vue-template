import BaseModel from "../vendor/baseModel";
import Users from '../main/views/Users'
import SingleUser from '../main/views/User'

export class User extends BaseModel {
    constructor() {
        super({
            url: 'users',
            default: {
                username: '',
                first_name: '',
                last_name: ''
            },
            page_size: 'all',
            routes: [
                {
                    name: 'list',
                    component: Users
                },
                {
                    name: 'item',
                    component: SingleUser,
                    single: true
                },
            ],
            configuration: {
                showSearch: false
            },
            info: {
                listTitle: 'Пользователи',
                listDescription: 'Список пользователей системы',
                itemTitle: 'Пользователь'
            }
        });
    }
}