import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TextArea = () => {
  const dataUrl = 'https://notes-2a82e-default-rtdb.firebaseio.com';
  const [text, setText] = useState('');
  const [isSaved, setSaved] = useState(false);
  console.log(text, 'text control');
  const newList = { text };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`${dataUrl}/myGames.json`, newList).then(() => {
      setSaved(true);
      const timer = setTimeout(() => {
        setSaved(false);
      }, 5000);
      return () => clearTimeout(timer);
    });
  };

  useEffect(() => {
    setSaved(false);
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
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group
        className='d-flex flex-column mb-0'
        controlId='exampleForm.ControlTextarea1'
        style={{ height: '700px', width: '400px' }}
      >
        <Form.Control
          as='textarea'
          autoComplete='off'
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
        <Button
          type='submit'
          variant={isSaved ? 'light' : 'dark'}
          style={{ borderColor: 'white', fontWeight: 'bold' }}
        >
          {isSaved ? 'Saved' : 'Save changes'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TextArea;
