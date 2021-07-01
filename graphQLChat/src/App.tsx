import React, {useState} from 'react';
import ChatView from './ChatView';
import CreateUser from './CreateUser';

const App = () => {
  const [userName, setUserName] = useState<string | null>(null);
  return userName ? (
    <ChatView userName={userName} />
  ) : (
    <CreateUser setUserName={setUserName} />
  );
};

export default App;
