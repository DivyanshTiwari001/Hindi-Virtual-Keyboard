import React,{useRef} from 'react'

function ParallelColLayout({cols,keyPress,layers,caretHandler,columnWidth,longPress}) {
    const darkChars = ['Layer','⌫','<','>']
  return (
    <div className='flex flex-row justify-center w-full'>
        {
            cols.map(charList=>{
                return <div className={`flex flex-col item-center ${columnWidth}`}>
                    {
                        charList.map((elem,index)=>{
                            return <button className={darkChars.includes(elem)?"bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full":"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full" }
                            onClick={
                                ()=>{
                                    if(elem=='⌫'){
                                        return
                                    }
                                    else if(elem=='Layer'){
                                        layers.setLayer(prevLayer=>{
                                            if(prevLayer==3)return 1;
                                            return prevLayer+1;
                                        })
                                    }
                                    else if(elem==='<'){
                                        caretHandler(-1)
                                    }
                                    else if(elem==='>'){
                                        caretHandler(1)
                                    }
                                    else keyPress(elem)
                                }
                                
                            }
                            onMouseDown={()=>{
                                if(elem==='⌫')longPress?.setkeyPressed(prevValue=>{return{isPressed:true,type:'⌫'}})
                                if(elem==='↵')longPress?.setkeyPressed(prevValue=>{return{isPressed:true,type:'↵'}})
                            }}
                            onMouseUp={()=>{
                                longPress?.setkeyPressed(prevValue=>{return{isPressed:false,type:null}})
                            }}
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