import React, { useState } from "react"
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	ThemeProvider,
} from "@material-ui/core"

import Node from "@/utils/node"

import theme from "@/styles/theme"

import logoImage from "@/assets/logo-320.png"

import useStyles from "@/components/LoginDialog/styles"

type LoginDialogResponse = {
	name: string
	password: string
}

type LoginDialogType = {
	open: (error? :string) => Promise<LoginDialogResponse>
}

type LoginDialogProps = {
	callback: (response: LoginDialogResponse) => void,
	error: string
}

const LoginDialog: LoginDialogType & React.FC<LoginDialogProps> = (props) => {
	const { callback, error } = props

	const [dialogVisible, setDialogVisible] = useState(true)
	const [response, setResponse] = useState<LoginDialogResponse>({ name: "", password: "" })

	const classes = useStyles()

	const handleConfirm = () => {
		if (!response.name || !response.password) {
			return
		}

		setDialogVisible(false)

		callback(response)
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()

		handleConfirm()
	}

	const handleChange = (key: keyof LoginDialogResponse, value: LoginDialogResponse[keyof LoginDialogResponse]) => {
		setResponse(lastState => ({
			...lastState,
			[key]: value,
		}))
	}

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				open={dialogVisible}
				style={{
					zIndex: 999999,
				}}
			>
				<form
					onSubmit={handleSubmit}
					className={classes.form}
				>
					<DialogTitle>Login</DialogTitle>

					<img
						src={logoImage}
						alt="logo"
						className={classes.logo}
					/>

					<DialogContent>
						<DialogContentText color="textPrimary">
							You have to choose a name in order to play this game.
						</DialogContentText>
						<TextField
							autoFocus
							required
							margin="dense"
							label="Name"
							value={response.name}
							onChange={({ target }) => handleChange("name", target.value)}
							fullWidth
						/>
						<TextField
							autoFocus
							required
							margin="dense"
							label="Password"
							type="password"
							value={response.password}
							onChange={({ target }) => handleChange("password", target.value)}
							fullWidth
						/>
						{error &&
							<DialogContentText color="error">
								{error}
							</DialogContentText>
						}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleConfirm}
							variant="contained"
							color="primary"
							type="submit"
						>
							Confirm
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</ThemeProvider>
	)
}

LoginDialog.open = async (error?:string): Promise<LoginDialogResponse> => new Promise(resolve => Node.renderComponent(
	"login-dialog",
	<LoginDialog
		callback={resolve}
		error={error || ""}
	/>,
))

export default LoginDialog
