export default function generateCode(): string {

	const characterSet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234568789";

	let code: string = "";

	for (let index = 0; index < 8; ++index) {
		const randomIndex: number = Math.floor(
			Math.random() * characterSet.length
		);
		code += characterSet[randomIndex];
	}
	
	return code;
}
