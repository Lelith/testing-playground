import React from 'react';
import './App.css';
import  {Form, FormControl, TextInput, Stack,Heading, Select} from '@contentful/f36-components';

import {FancyButton} from './FancyButton';
import {Counter} from './Counter';

const counterStart="4";

function App() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formData, updateFormData] = React.useState([{name:'counter', value:counterStart}]);

  const handleChange = (e) => {
    updateFormData([
      ...formData,
      {
        name: e.target.name,
        value: e.target.value.trim()
      }
    ]);
  };
  
  const submitForm = () => {
    transformDataBeforeSending(formData);
    setIsSubmitted(true);
  };

  const hobbies = ['Cuddling', 'Purring', 'Playing', 'Hiding', 'Napping', 'Zoomies'];


  const transformDataBeforeSending = (data) => {
    // does some magic with the data to change the expected shape  
    return data;
  }


  return (
    <div className="App">
      <Heading>Cat Profile</Heading>
        <Stack flexDirection="column">
          <img src="http://placekitten.com/200/300" />

            <Form>
              <FormControl className="formRow">
                <FormControl.Label htmlFor="counter">
                  Cat Cutness
                </FormControl.Label>
                <Counter name="counter" onChange={handleChange} initialCounter="4"/>
              </FormControl>
                <FormControl className="formRow">
                <FormControl.Label htmlFor="furcolor">Name</FormControl.Label><TextInput onChange={handleChange} type="text" name="name" id="name" />
              </FormControl>
              <FormControl className="formRow" >
                <FormControl.Label htmlFor="name">Fur Color</FormControl.Label>
                <TextInput id="furcolor" testId='furcolor' onChange={handleChange} type="text" name="furcolor" />
              </FormControl>
              <FormControl className="formRow">
                <FormControl.Label htmlFor="hobbies">Hobbies</FormControl.Label>
                <Select id="hobbies" onChange={handleChange} name="hobbies">
                  {hobbies.map((space) => {
                const val = space.toLowerCase().replace(/\s/g, '-');
                return (
                  <Select.Option
                    key={`key-${val}}`}
                    itemID={`space-${val}}`}
                    value={space}
                    label={space}
                  />
                );
              })}
                </Select>
                </FormControl>            
      
              <FancyButton data-test-id='submit-btn' onClick={submitForm} disabled={isSubmitted} style={{display:isSubmitted? 'none':'block'}}>Send</FancyButton>
            </Form>
            {isSubmitted && formData.map((data, idx) => {
              return (
              <div key={`form-data-${idx}`}>
                {data.name}:{data.value}
              </div>
              )})  
            }
        </Stack>
    </div>
  );
}

export default App;
