import { useRef } from "react"

function Layout({row1,row2,col1,col2,keyPress,isChildren,children,layers,caretHandler,longPress=null}) {
    const darkChars = ['Layer','⌫','<','>','↵']
  return (
    <div className='flex flex-col'>
        {
            row1 && <div className='flex justify-center '>
            {
                row1.map((elem,index)=>{
                    return <button className={darkChars.includes(elem)?"bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded md:w-16 w-12":"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded md:w-16 w-12" } 
                    onClick={()=>{
                        if(elem==='<'){
                            caretHandler(-1)
                            // return;
                        }
                        else if(elem==='>'){
                            caretHandler(1)
                            // return
                        }
                        else keyPress(elem)}}
                    
                    key={elem+index}>
                            {elem}
                        </button>
                })
            }
        </div>
        }
        <div className="flex flex-row">
            {
                col1 && <div className="flex flex-col">
                {
                    col1.map((elem,index)=>{
                        return <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded md:w-16 w-12" 
                        onClick={()=>{keyPress(elem)}}
                        key={elem+index}>
                                {elem}
                            </button>
                    })
                }
                </div>
            }
            <div>
                {isChildren && children}
            </div>
            {
                col2 && <div className="flex flex-col">
                {
                    col2.map((elem,index)=>{
                        return <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded md:w-16 w-12" 
                        onClick={()=>{keyPress(elem)}}
                        key={elem+index}>
                                {elem}
                            </button>
                    })
                }
                </div>
            }
        </div>
        {
           row2 && <div className='flex justify-center '>
            {
                row2.map((elem,index)=>{
                    return <button className={darkChars.includes(elem)?"bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded md:w-16 w-12":"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded md:w-16 w-12" } 
                    onClick={()=>{
                        if(elem=='⌫'){
                            return
                        }
                        else if(elem=='Layer'){
                            layers.setLayer(prevLayer=>{
                                if(prevLayer==3)return 1;
                                return prevLayer+1;
                            })
                        }
                        else if(elem==='↵')return
                        else keyPress(elem)
                        }}
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
        }
    </div>
  )
}

export default Layout