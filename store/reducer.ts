import { combineReducers } from "redux"
import authentication from "@reducers/authentication"
import meme from "@reducers/meme"
import user from "@reducers/user"

export default combineReducers({
	authentication,
	meme,
	user
})
