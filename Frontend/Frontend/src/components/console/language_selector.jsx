import React from 'react'
import { useState } from 'react';
import { LANGUAGE_IDS } from './constants'

const languages =  Object.entries(LANGUAGE_IDS)

function LanguageSelector({selectedLanguage,setSelectedLanguage}) {
    const [open, setOpen] = useState(false);
    const defaultLan = "javascript"
    return (
        <div className="relative z-50">

            {/* Dropdown button */}
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md"
            >
                {selectedLanguage}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-full mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                    
                    {languages.map(([language,version]) => (
                        <button
                            key={language}
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                            onClick={()=>{
                                setSelectedLanguage(language)
                                setOpen(false)
                            }}
                        >
                            {language}


                        </button>
                    ))}

                </div>
            )}

        </div>
    );
}

export default LanguageSelector