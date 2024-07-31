import React from 'react'

function ParallelColLayout({cols,keyPress,layers}) {
  return (
    <div className='flex flex-row justify-center'>
        {
            cols.map(charList=>{
                return <div className='flex flex-col item-center'>
                    {
                        charList.map((elem,index)=>{
                            return <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-16" 
                            onClick={
                                ()=>{
                                    if(elem=='Del'){
                                        keyPress(null,true)
                                    }
                                    else if(elem=='Layer'){
                                        layers.setLayer(prevLayer=>{
                                            if(prevLayer==3)return 1;
                                            return prevLayer+1;
                                        })
                                    }
                                    else keyPress(elem)
                                }
                            }
                            key={elem+index}>
                                   {elem==='Layer'?`${layers.currentLayer}/3`:elem}
                            </button>
                        })
                    }
                </div>
            })
        }
    </div>
  )
}

export default ParallelColLayout