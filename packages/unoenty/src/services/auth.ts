import Storage from "@/services/storage"

import { Password, Player } from "@uno-game/protocols"

class Auth {
	authKey = "Un0-@uTh"

	getPlayerData () {
		const authData = Storage.get<Player>(this.authKey)

		return authData
	}

	getPassword () {
		const password = Storage.get<Password>(this.authKey)

		return password?.password || ""
	}

	setPlayerData (authData: Player) {
		Storage.set(this.authKey, authData)
	}

	setPassword (password: Password) {
		Storage.set(this.authKey, password)
	}

	logout () {
		Storage.delete(this.authKey)

		window.location.href = "/"
	}
}

export default new Auth()
