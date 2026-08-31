import { useContext, useState } from "react";
import fileContext from "../../context/FileContext";
import axios from "axios";

export default function AIPanel({ selectedLanguage, editorRef }) {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [showResponse, setShowResponse] = useState(false);
    const [loading, setLoading] = useState(false);

    const { setcontent } = useContext(fileContext);

    const getCurrentCode = () => {
        if (!editorRef?.current) {
            return "";
        }

        return editorRef.current.getValue();
    };

    const handleAIAction = async (action) => {
        const currentCode = getCurrentCode();

        if (!currentCode.trim()) {
            alert("There is no code in the editor.");
            return;
        }

        setLoading(true);

        const givendata = {
            action: action,
            language: selectedLanguage,
            code: currentCode,
            prompt: prompt
        };

        try {
            const result = await axios.post(
                "http://127.0.0.1:8000/ai",
                givendata
            );

            setResponse(result.data.response);
            setShowResponse(true);

        } catch (error) {
            console.error("AI request error:", error);
            alert("AI request failed.");

        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            return;
        }

        setLoading(true);

        const currentCode = getCurrentCode();

        const givendata = {
            action: "Ask",
            language: selectedLanguage,
            code: currentCode,
            prompt: prompt
        };

        try {
            const result = await axios.post(
                "http://127.0.0.1:8000/ai",
                givendata
            );

            setResponse(result.data.response);
            setShowResponse(true);

        } catch (error) {
            console.error("AI request error:", error);
            alert("AI request failed.");

        } finally {
            setLoading(false);
        }
    };

    const keepChanges = () => {
        if (!editorRef?.current) {
            return;
        }

        // Update React state
        setcontent(response);

        // Update Monaco Editor
        editorRef.current.setValue(response);

        setResponse("");
        setShowResponse(false);
    };

    const discardChanges = () => {
        setResponse("");
        setShowResponse(false);
    };

    return (
        <div className="fixed right-4 top-1/2 z-50 h-[60vh] w-105 -translate-y-1/2 overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] text-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">

                <div>
                    <p className="text-sm font-semibold">
                        AI Assistant
                    </p>

                    <p className="text-xs text-gray-500">
                        Improve and generate your code
                    </p>
                </div>

                <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                    AI
                </span>

            </div>

            <div className="h-[calc(100%-57px)] overflow-y-auto">

                {!showResponse ? (
                    <>
                        {/* Actions */}
                        <div className="space-y-2 p-4">

                            {/* Fix */}
                            <button
                                disabled={loading}
                                onClick={() => handleAIAction("Fix")}
                                className="w-full rounded-lg border border-gray-800 bg-[#11161d] px-4 py-3 text-left text-sm hover:border-blue-500/40 hover:bg-[#151b23] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <span className="font-medium">
                                    Fix
                                </span>

                                <p className="mt-1 text-xs text-gray-500">
                                    Find and fix problems in your code
                                </p>
                            </button>

                            {/* Optimize */}
                            <button
                                disabled={loading}
                                onClick={() => handleAIAction("Optimize")}
                                className="w-full rounded-lg border border-gray-800 bg-[#11161d] px-4 py-3 text-left text-sm hover:border-blue-500/40 hover:bg-[#151b23] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <span className="font-medium">
                                    Optimize
                                </span>

                                <p className="mt-1 text-xs text-gray-500">
                                    Improve performance and code quality
                                </p>
                            </button>

                            {/* Convert */}
                            <button
                                disabled={loading}
                                onClick={() =>
                                    handleAIAction(
                                        `Convert to ${selectedLanguage}`
                                    )
                                }
                                className="w-full rounded-lg border border-gray-800 bg-[#11161d] px-4 py-3 text-left text-sm hover:border-blue-500/40 hover:bg-[#151b23] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <span className="font-medium">
                                    Convert to {selectedLanguage || "language"}
                                </span>

                                <p className="mt-1 text-xs text-gray-500">
                                    Convert the current code
                                </p>
                            </button>

                        </div>

                        {/* Generate */}
                        <div className="border-t border-gray-800 p-4">

                            <p className="mb-2 text-sm font-medium">
                                Generate Code
                            </p>

                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Tell AI what you want to build..."
                                className="h-24 w-full resize-none rounded-lg border border-gray-800 bg-[#11161d] p-3 text-sm outline-none placeholder:text-gray-600 focus:border-blue-500"
                            />

                            <button
                                onClick={handleGenerate}
                                disabled={!prompt.trim() || loading}
                                className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {loading ? "AI is working..." : "Generate"}
                            </button>

                        </div>
                    </>
                ) : (

                    /* AI RESPONSE */
                    <div className="flex h-full flex-col">

                        <div className="border-b border-gray-800 px-4 py-3">

                            <p className="text-sm font-medium">
                                AI Suggestion
                            </p>

                            <p className="text-xs text-gray-500">
                                Review before applying
                            </p>

                        </div>

                        <pre className="flex-1 overflow-auto whitespace-pre-wrap bg-[#080b0f] p-4 font-mono text-xs leading-5 text-gray-300">
                            {response}
                        </pre>

                        <div className="border-t border-gray-800 p-4">

                            <p className="mb-3 text-sm text-gray-400">
                                Keep these changes?
                            </p>

                            <div className="flex gap-2">

                                <button
                                    onClick={discardChanges}
                                    className="flex-1 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    Discard
                                </button>

                                <button
                                    onClick={keepChanges}
                                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
                                >
                                    Keep Changes
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}