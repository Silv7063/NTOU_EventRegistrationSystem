export const getEvents = () => {
    return fetch('http://localhost:4000/api/events')
      .then(response => response.json())
      .then(data => data);
  };
  
  export const getEventDetails = (id) => {
    return fetch(`http://localhost:4000/api/events/${id}`)
      .then(response => response.json())
      .then(data => data);
  };
  