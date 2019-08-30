import React from 'react'
import { StatusBar } from 'react-native'

import Routes from './routes'

export default function Main() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#2e9ec7"></StatusBar>
            <Routes></Routes>
        </>
    )

}              