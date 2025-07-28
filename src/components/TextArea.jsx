import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TextArea = () => {
  const dataUrl = 'https://notes-2a82e-default-rtdb.firebaseio.com';
  const [text, setText] = useState('');
  console.log(text, 'text control');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataUrl}/myGames.json`);
        console.log(response, 'response');
        console.log(response.data, 'data from FB');
        setText(response.data.text);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Form>
      <Form.Group
        className='mb-3'
        controlId='exampleForm.ControlTextarea1'
        style={{ height: '400px', width: '400px' }}
      >
        <Form.Control
          as='textarea'
          style={{
            height: '100%',
            width: '100%',
            resize: 'none',
            backgroundColor: '#282c34',
            color: 'white',
            fontWeight: 'bold',
          }}
          onChange={e => setText(e.target.value)}
          value={text}
        />
      </Form.Group>
    </Form>
  );
};

export default TextArea;
