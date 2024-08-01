import React,{useEffect, useState,useRef} from 'react'
import VirtualKeyboard from './layout/VirtualKeyboard';

function App() {
  const textareaRef = useRef(null);
  const [text,setText] = useState('')
  const [caretPosition,setCaretPosition] = useState(0);

  const caretHandler=(value)=>{
    if(caretPosition+value < 0)return;
    setCaretPosition(prevCaretPos=>prevCaretPos+value);
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(caretPosition+value, caretPosition+value);
  }

  useEffect(()=>{
    caretHandler(0)
  },[caretPosition,caretHandler])

  const handleKeyPresses = (character,removeLast)=>{
    let pos = textareaRef.current.selectionStart;
    if(character===null && removeLast){
      if(pos==0)return;
      setCaretPosition(prevpos=>pos-1)
      setText(prevText=>{
        return prevText.slice(0,pos-1) + prevText.slice(pos);
      })
    }
    else if(removeLast){
      setCaretPosition(prevpos=>pos+character.length)
      setText(prevText=>{
        return  prevText.slice(0,pos-1) + character + prevText.slice(pos);
      })
    }
    else{
      setCaretPosition(prevpos=>pos+character.length)
      setText(prevText=>{
        return prevText.slice(0,pos) + character + prevText.slice(pos)
      })
    }
  }
  return(
    <div className='w-full h-screen flex flex-col items-center'>
      <textarea className='w-5/6 md:3/4 m-3 h-40 rounded-md text-xl text-orange-400 font-semibold  border-2 border-black caret-slate-950' value={text} ref={textareaRef} onChange={(e)=>{setText(e.target.value)}} inputMode='none'/>
      <VirtualKeyboard onKeyPress={handleKeyPresses} textAreaRef = {textareaRef} caretHandler={caretHandler}/>
    </div>
  )
}

export default App;
