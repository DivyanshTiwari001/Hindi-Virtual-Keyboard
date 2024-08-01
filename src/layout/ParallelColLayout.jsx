import React,{useRef} from 'react'

function ParallelColLayout({cols,keyPress,layers,caretHandler,columnWidth,touch}) {
    const darkChars = ['Layer','Del','<','>']
    const keyIntervalRef = useRef(null)
    const keyTimoutRef = useRef(null)
    const keyPressHandler = (elem)=>{
            if(elem==='<'){
                caretHandler(-1)
            }
            else if(elem==='Del'){
                keyPress(null,true)
            }
            else if(elem=='Layer'){
                layers.setLayer(prevLayer=>{
                    if(prevLayer==3)return 1;
                    return prevLayer+1;
                })
            }
            else if(elem==='>'){
                caretHandler(1)
            }
            else keyPress(elem)
        }
    const mouseDownHandler = (event,elem)=>{
        if(elem=='Layer')return;
        if(event.type==='touchstart')touch.touchFlagRef.current = true;
        keyPressHandler(elem);
        keyTimoutRef.current = setTimeout(()=>{
            keyIntervalRef.current = setInterval(()=>{keyPressHandler(elem)},50)
        },1000)
        
    }
    const mouseUpHandler = ()=>{
        clearInterval(keyIntervalRef.current);
        clearTimeout(keyTimoutRef.current)
        keyIntervalRef.current = null
        keyTimoutRef.current = null
        touchFlagRef.current = false;
    }
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
                                    if(elem=='Del'){
                                        keyPress(null,true)
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
                            onMouseDown={(e)=>{touch.preventMouseEvents(e),mouseDownHandler(e,elem)}}
                            onMouseUp = {()=>{mouseUpHandler()}}
                            onTouchStart={(e)=>{mouseDownHandler(e,elem)}}
                            onTouchEnd={()=>{mouseUpHandler()}}
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