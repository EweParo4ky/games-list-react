import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import axios from 'axios';

const TextArea = () => {
  const dataUrl = 'https://notes-2a82e-default-rtdb.firebaseio.com';
  const [text, setText] = useState('');
  const [isSaved, setSaved] = useState(false);
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

  const counter = (str, char) => {
    return str.split(char).length - 1;
  };

  const textAreaRef = useRef(null);

  useEffect(() => {
    setSaved(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataUrl}/myGames.json`);
        setText(response.data.text);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (textAreaRef) {
      const textarea = textAreaRef.current;
      textarea.focus();
    }
    scroll.scrollToBottom({ containerId: 'games-list', delay: 0, duration: 0 });
  }, [text.length]);

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group
        className='d-flex flex-column mb-0'
        // controlId='exampleForm.ControlTextarea1'
        style={{ height: '700px', width: '350px', overflow: 'auto' }}
      >
        <div
          className='pb-1'
          style={{
            fontSize: '1.2rem',
            backgroundColor: '#282c34',
            color: 'white',
            border: 'solid',
            borderColor: 'white',
            borderRadius: 'var(--bs-border-radius)',
            borderWidth: '2px',
            fontWeight: 'bold',
          }}
        >
          {`Completed games: ${counter(text, '+')}`}
        </div>
        <Form.Control
          ref={textAreaRef}
          id='games-list'
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
          disabled={isSaved}
          variant={isSaved ? 'secondary' : 'dark'}
          style={{ borderColor: 'white', fontWeight: 'bold' }}
        >
          {isSaved ? 'Saved' : 'Save changes'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TextArea;
