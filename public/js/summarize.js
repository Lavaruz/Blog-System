const mksa = document.getElementById('mksa')
const button = document.getElementById('generateMksa')
let content = ''

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/csebuetnlp/mT5_multilingual_XLSum",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

button.addEventListener('click', ()=>{	
	content = document.getElementById("content").value
	output = query({
		"inputs": content,
	})
	console.log(output);
})
