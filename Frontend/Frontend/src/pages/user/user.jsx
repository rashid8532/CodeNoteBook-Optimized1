import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import fileContext from '../../context/FileContext'
import getUserData from './userapi'

function User() {
    const token = localStorage.getItem("token")

    const {user,setuser} = useContext(fileContext)

    useEffect(() => {
        getUserData(setuser)
    }, [])

    return (
        <div className="min-h-screen bg-[#05070b] text-white flex justify-center items-center px-6 py-10 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute -top-37.5 -left-37.5 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-37.5 -right-37.5 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

            {/* Profile Card */}
            <div className="relative w-full max-w-3xl bg-[#0d1117] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden">

                {/* Top header */}
                <div className="h-32 bg-linear-to-r from-blue-600/20 via-blue-500/10 to-transparent border-b border-gray-800 relative">


                    {/* Blue line */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>

                </div>

                {/* Profile content */}
                <div className="px-8 md:px-12 pb-10">

                    {/* Avatar */}
                    <div className="relative -mt-16 mb-6">

                        <div className="w-28 h-28 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 p-0.5 shadow-xl shadow-blue-500/20">

                            <div className="w-full h-full rounded-2xl bg-[#11161d] flex items-center justify-center">

                                <span className="text-4xl font-bold text-blue-400">
                                    {user.FirstName
                                        ? user.FirstName.charAt(0).toUpperCase()
                                        : "U"}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Title */}
                    <div className="mb-8">

                        <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
                            Account Profile
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {user.FirstName || "User"} {user.LastName}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your CodeNoteBook account information
                        </p>

                    </div>

                    {/* User information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Username */}
                        <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/40 transition duration-300">

                            <p className="text-gray-500 text-sm mb-2">
                                Username
                            </p>

                            <p className="text-lg font-medium text-white break-all">
                                {user.UserName}
                            </p>

                        </div>

                        {/* Email */}
                        <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/40 transition duration-300">

                            <p className="text-gray-500 text-sm mb-2">
                                Email Address
                            </p>

                            <p className="text-lg font-medium text-white break-all">
                                {user.Email}
                            </p>

                        </div>

                        {/* First Name */}
                        <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/40 transition duration-300">

                            <p className="text-gray-500 text-sm mb-2">
                                First Name
                            </p>

                            <p className="text-lg font-medium text-white">
                                {user.FirstName}
                            </p>

                        </div>

                        {/* Last Name */}
                        <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/40 transition duration-300">

                            <p className="text-gray-500 text-sm mb-2">
                                Last Name
                            </p>

                            <p className="text-lg font-medium text-white">
                                {user.LastName}
                            </p>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                CodeNoteBook
                            </p>

                            <p className="text-xs text-gray-600 mt-1">
                                Your coding workspace
                            </p>
                        </div>

                        <div className="flex items-center gap-2">

                            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>

                            <span className="text-sm text-gray-400">
                                Account Active
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default User