import axios from "axios";
import { LANGUAGE_IDS } from "./constants";

const API = axios.create({
    baseURL: "https://ce.judge0.com"
});


export const executeCode = async (language, sourceCode) => {
    const languageId = LANGUAGE_IDS[language]

    const response = await API.post("/submissions", {
        language_id: languageId,
        source_code: sourceCode
    });

    const token = response.data.token

    while(true){
    const Result =  await API.get(`/submissions/${token}`)


        if(Result.data.status.id > 2){
            return Result.data
        }

        await new Promise(resolve => setTimeout(resolve,1000))

        // console.log(Result.data.stdout)
        // console.log(Result.data.message)
    }
};

