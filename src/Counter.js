import React from 'react';
import {TextInput, Stack} from '@contentful/f36-components';
import {ChevronDownIcon, ChevronUpIcon} from '@contentful/f36-icons';

export const Counter = (props) => {
  const {initialCounter=0, min=-100, max=100, onChange, ...other} = props;
  const [counter, setCounter] = React.useState(initialCounter);
  const internalInputRef = React.useRef(null);
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  ).set;

  const increaseCounter = () => {
    if(counter < max) {
      const newValue = counter+1;
      setCounter(newValue);
       // https://stackoverflow.com/a/46012210/17269164
      nativeInputValueSetter.call(internalInputRef.current, newValue);
      const forcedEvent = new Event('change', { bubbles: true });
      internalInputRef.current.dispatchEvent(forcedEvent);
    }
  } 

  const decreaseCounter = () =>  {  
    if(counter > min) {
    const newValue = counter- 1;
      setCounter(newValue);
    nativeInputValueSetter.call(internalInputRef.current, newValue);
    const forcedEvent = new Event('change', { bubbles: true });
    internalInputRef.current.dispatchEvent(forcedEvent);
  } 
}

  return (
    <Stack className='counter'>
      <button data-test-id="increase" onClick={increaseCounter} tabIndex="0" role="button">
          <ChevronUpIcon alt="increase" />
      </button>
        <TextInput {...other} testId="counter" value={counter} readOnly onChange={onChange} ref={internalInputRef} />
            <div data-test-id="decrease" onClick={decreaseCounter} tabIndex="0" role="button" >
        <ChevronDownIcon alt="Decrease" />
      </div>
    </Stack>
  );
};