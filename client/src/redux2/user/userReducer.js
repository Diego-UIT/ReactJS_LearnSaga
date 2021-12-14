import { getUsers, addUser, editUser, deleteUser, loginUser, loadUser, logoutUser } from './userAction'

const initState = {
    Users: [],
    accessToken: "",
    user: null
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case getUsers.getUsersRequest().type:
        case getUsers.getUsersFailure().type:
        case addUser.addUserRequest().type:
        case addUser.addUserFailure().type:
        case editUser.editUserRequest().type:
        case editUser.editUserFailure().type:
        case deleteUser.deleteUserRequest().type:
        case deleteUser.deleteUserFailure().type:
            return state   
        case getUsers.getUsersSuccess().type:
            console.log(action.payload)
            return {...state, Users: action.payload.users}
        case addUser.addUserSuccess().type:
            return {...state, Users: [...state.Users, action.payload]}
        case deleteUser.deleteUserSuccess().type:
        return {...state, Users: state.Users.filter(user => user._id !== action.payload)}
        case editUser.editUserSuccess().type: 
        {   console.log(action.payload)
            return {...state, Users: state.Users.map(user => (user._id === action.payload._id) ? 
            {...state, 
                username: action.payload.username,
                password: action.payload.password} : user)
        }}
        case loginUser.loginUserSuccess().type:
            return {...state, accessToken: action.payload.accessToken, user: action.payload.user}
        case loadUser.loadUserSuccess().type:
            return {...state, user: action.payload.user}
        case logoutUser.logoutUserSuccess().type:
            return {...state, accessToken: "", user: null}
        default:
            return state
    }
}

export default userReducer