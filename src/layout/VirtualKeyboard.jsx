// src/VirtualKeyboard.js
import React, { useState,useRef } from 'react';
import { VOWELS, SPECIAL_CHARS, CONSONANTS, CONSTANT_COMBINATIONS_MAPPING,DIACRATICS } from '../res/constants';
import Layout from './Layout';
import ParallelColLayout from './ParallelColLayout';

function VirtualKeyboard({ onKeyPress,textAreaRef,caretHandler }) {
  const [currentConsonant, setCurrentConsonant] = useState(null);
  const [currentVowel,setVowel] = useState(null);
  const [currentLayer,setLayer] = useState(1);
  const spaceIntervalRef = useRef(null)
  const spaceTimoutRef = useRef(null)
  const touchFlagRef = useRef(false);

  const preventMouseEvents = (event) => {
    if (touchFlagRef.current) {
      event.preventDefault();  // Prevent the default mouse event behavior
      event.stopPropagation();  // Stop the event from propagating further
    }
  };

  const mouseDownHandlerForSpace = (e)=>{
    if(e.type==='touchstart')touchFlagRef.current = true;
     handleCharClick(' ');
     spaceTimoutRef.current = setTimeout(()=>{
          spaceIntervalRef.current = setInterval(()=>{handleCharClick(' ')},50)
        },1000)
  }
  const mouseUpHandlerForSpace = ()=>{
    clearInterval(spaceIntervalRef.current);
    clearTimeout(timoutRef.current)
    spaceIntervalRef.current = null
    spaceTimoutRef.current = null
    touchFlagRef.current = false
  }
  const handleConsonantClick = (consonant) => {
    textAreaRef.current.focus();
    setCurrentConsonant(consonant);
    setVowel(null)
    onKeyPress(consonant,false);
  };

  const handleCharClick = (char,forcedRemove=false) => {
    textAreaRef.current.focus();


    if(!char){onKeyPress(char,true);return} //handle Del button

    
    let pos = textAreaRef.current.selectionStart;
    let trailingChar = textAreaRef.current.value.charAt(pos-1) 
    let consonant = null;
    let vowel = currentVowel;
  
    if((SPECIAL_CHARS['set1'].includes(trailingChar) || SPECIAL_CHARS['set2'].includes(trailingChar) || VOWELS['harshwa'].includes(trailingChar) || VOWELS['dirgha'].includes(trailingChar) || DIACRATICS.includes(trailingChar))){
      vowel = trailingChar;
    }

    else {
      consonant = trailingChar
    }
    
    if(CONSONANTS['varg-7'].includes(char) && char!='्'){
        setCurrentConsonant(prevConsonant => char);
        setVowel(prevVowel=>null)
        onKeyPress(char,false);
    }
    else if (consonant && !vowel) {
      const combination = consonant + (CONSTANT_COMBINATIONS_MAPPING[char] || '');
      onKeyPress(combination,true);
      setCurrentConsonant(prevConsonant=>null);
      setVowel(prevChar=>char)
    } else {
      setVowel(prevVowel=>{
        return char
    })
      onKeyPress(char,forcedRemove);
    }
  };

  return (
    <div className='w-full absolute md:relative bottom-1 flex flex-col items-center  md:flex-row justify-center'>
   { currentLayer==2 && <div className='w-full justify-center items-center md:w-fit flex flex-row'>
    <Layout 
    row1={CONSONANTS['varg-5']} 
    row2={CONSONANTS['varg-6']}
    col1={CONSONANTS['varg-7']}
    col2={SPECIAL_CHARS['set1']} 
    keyPress={handleConsonantClick}
    touch = {{touchFlagRef,preventMouseEvents}}
    isChildren={true}>
        <Layout
            row1={VOWELS['harshwa'].slice(0,5)}
            row2={VOWELS['dirgha'].slice(0,5)}
            col1={VOWELS['harshwa'].slice(5)}
            col2={VOWELS['dirgha'].slice(5)}
            keyPress={handleCharClick}
            layers={{currentLayer,setLayer}}
            caretHandler={caretHandler}
            touch = {{touchFlagRef,preventMouseEvents}}
            isChildren={true}
        >
            <button className='w-36 md:w-48 border-2 border-red-400 h-full text-white bg-red-500 text-bolder' onClick={()=>{handleCharClick(' ')}} onMouseDown={(e)=>{preventMouseEvents(e);mouseDownHandlerForSpace(e)}} onMouseUp={mouseUpHandlerForSpace} onTouchStart={mouseDownHandlerForSpace} onTouchEnd={mouseDownHandlerForSpace}>स्पेस</button>
        </Layout>
    </Layout>
    </div>
  }{
    currentLayer==1 && <div className='w-full justify-center items-center md:w-fit flex flex-row'>
    <Layout 
    row1={CONSONANTS['varg-1']} 
    row2={CONSONANTS['varg-2']}
    col1={CONSONANTS['varg-3']}
    col2={CONSONANTS['varg-4']} 
    keyPress={handleConsonantClick}
    touch = {{touchFlagRef,preventMouseEvents}}
    isChildren={true}>
        <Layout
            row1={VOWELS['harshwa'].slice(0,5)}
            row2={VOWELS['dirgha'].slice(0,5)}
            col1={VOWELS['harshwa'].slice(5)}
            col2={VOWELS['dirgha'].slice(5)}
            keyPress={handleCharClick}
            layers={{currentLayer,setLayer}}
            caretHandler={caretHandler}
            touch = {{touchFlagRef,preventMouseEvents}}
            isChildren={true}
        >
            <button className='w-36 md:w-48 border-2 border-red-400 h-full text-white bg-red-500 text-bolder' onClick={()=>{handleCharClick(' ')}} onMouseDown={mouseDownHandlerForSpace} onMouseUp={mouseUpHandlerForSpace} onTouchStart={mouseDownHandlerForSpace} onTouchEnd={mouseUpHandlerForSpace}>स्पेस</button>
        </Layout>
    </Layout>
    </div>
  }{
    currentLayer==3 && <div className='w-full md:w-fit md:ml-2 flex items-center justify-center'>
        <ParallelColLayout cols={[['+','-','/','*','<'],['1','4','7','Layer','%'],['2','5','8','0','='],['3','6','9','.','₹'],SPECIAL_CHARS['set2'],['Del','^','!','?','>']]} keyPress={handleCharClick} layers={{currentLayer,setLayer}} caretHandler={caretHandler} columnWidth={'w-1/6'} touch = {{touchFlagRef,preventMouseEvents}}/>

    </div>
  }
    </div>
  );
}

export default VirtualKeyboard;
