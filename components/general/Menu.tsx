import React from 'react'

interface IMenuProps {
    setTab: (arg0: string) => void;
    tab: string;
    tabs: string[];
}

const Menu = ({ setTab, tab, tabs }: IMenuProps) => {
  return (
    <div className='inline-flex justify-around items-center px-[5px] gap-[5px] bg-[#f4f4f4] rounded-md font-medium py-[5px]'>
        {
            tabs.map((currTab) => {
                return (
                    <button key={currTab} onClick={() => setTab(currTab)} className={`cursor-pointer rounded-sm py-[5px] px-[12px] ${tab == currTab && 'bg-[#fff] shadow-sm'} transition-all duration-75 ease-in-out`}>
                        {currTab}
                    </button>
                )
            })
        }
    </div>
  )
}

export default Menu