import React from 'react'
import MainMessageBoard from './MainMessageBoard';
import MainProfileBar from './MainProfileBar';
import InputContainer from './InputContainer';
export default function MainContainer() {
    return (
        <>
                        <MainProfileBar />
                        <MainMessageBoard />
                        <InputContainer />
        </>
    )
}
