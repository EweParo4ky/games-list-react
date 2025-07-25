const TextArea = () => {
  return (
    <div
      className='cardContainer overflow-auto d-flex'
      style={{ height: '400px', width: '400px' }}
    >
      <div>
        <label
          htmlFor='exampleFormControlTextarea1'
          className='form-label'
        ></label>
        <textarea
          className='form-control d-flex overflow-auto h-100 w-100'
          id='exampleFormControlTextarea1'
          style={{ width: '100%', height: '400px' }}
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
