import axios from 'axios';
import { useEffect, useState } from 'react';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
    return response.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  function resetField() {
    setValue('');
  }

  return {
    type,
    value,
    onChange,
    resetField,
  };
};
