async function translateText() {
    const btn = document.getElementById("translateBtn");
    const text = document.getElementById("inputText").value.trim();
    const from = document.getElementById("sourceLang").value;
    const to = document.getElementById("targetLang").value;

    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    if (from === to) {
        alert("Source and Target languages cannot be the same.");
        return;
    }

    btn.innerText = "Translating...";
    btn.disabled = true;

    try {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
        );

        const data = await response.json();

        // 🔥 Combine all translated parts
        let translatedText = "";
        data[0].forEach(item => {
            if (item[0]) {
                translatedText += item[0];
            }
        });

        document.getElementById("outputText").value = translatedText;

    } catch (error) {
        alert("Translation failed.");
    }

    btn.innerText = "Translate";
    btn.disabled = false;
}


// ✅ Modern Copy Function
function copyText() {
    const text = document.getElementById("outputText").value;

    if (!text) {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Text copied successfully!"))
        .catch(() => alert("Copy failed"));
}
