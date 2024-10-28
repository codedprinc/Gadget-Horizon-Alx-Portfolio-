import React from 'react'
import { TailSpin } from "react-loader-spinner";
const Loading = () => {
  return (
    <TailSpin
        height="90"
        width="90"
        color='#2563eb'
        ariaLabel='tail-spin-loading'
        radius="1"
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
    />
  )
}

export default Loading