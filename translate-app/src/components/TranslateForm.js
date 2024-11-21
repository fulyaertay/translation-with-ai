


import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"

const TranslateForm = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyB_1pgW84IFTdpChSZj24Oqv4gIPbYqi0o");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const [inputText, setInputText] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("tr");
    const [translation, setTranslation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            alert("Please enter some text to translate.");
            return;
        }

        setLoading(true);
        try {
            const prompt = `Translate from English : ${inputText} to ${selectedLanguage} `
            const result = await model.generateContent(prompt);
            console.log(result.response.text())
            setTranslation(result.response.text());
        } catch (error) {
            console.error("Translation Error:", error);
            alert("An error occurred during translation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <textarea
                rows="4"
                cols="50"
                placeholder="Enter text to translate"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            <div>
                <label>
                    <input
                        type="radio"
                        name="language"
                        value="turkish"
                        checked={selectedLanguage === "turkish"}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    />
                    Turkish
                </label>
                <label>
                    <input
                        type="radio"
                        name="language"
                        value="french"
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    />
                    French
                </label>
                <label>
                    <input
                        type="radio"
                        name="language"
                        value="spanish"
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    />
                    Spanish
                </label>
            </div>
            <button onClick={handleTranslate} disabled={loading}>
                {loading ? "Translating..." : "Translate"}
            </button>
            {translation && (
                <div id="result">
                    <h3>Your Translation</h3>
                    <p>{translation}</p>
                </div>
            )}
        </div>
    );
};

export default TranslateForm;
