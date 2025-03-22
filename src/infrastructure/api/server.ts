import "dotenv/config";

import { app } from "./express";

const PORT: number = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
