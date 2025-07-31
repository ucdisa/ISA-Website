import Link from 'next/link'
import React from 'react'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

interface BackProps {
    link: any
}

const Back = ({ link }: BackProps) => {
  return (
    <Link href={link} className='hover:opacity-60 transition-all duration-200 w-[30px] py-[3px] flex justify-center items-center'>
        <KeyboardBackspaceOutlinedIcon />
    </Link>
  )
}

export default Back