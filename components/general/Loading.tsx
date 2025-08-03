import React from 'react'
import { Loader } from '@mantine/core';

const Loading = ({ size, color }: any) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader size={size} color={color} />
    </div>
  )
}

export default Loading