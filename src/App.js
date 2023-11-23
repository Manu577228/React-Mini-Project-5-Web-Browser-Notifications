import {
  ChakraProvider,
  theme,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';

async function notifyUser(
  notificationText = 'Thank you for enabling notifications!'
) {
  if (!'Notification in window') {
    alert('Browser does not support notifications');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== 'denied') {
    await Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        const notification = new Notification(notificationText);
      }
    });
  }
}

function App() {

const [response, setResponse] = useState(false);

const enableNotifsAndClose = async() => {
 await notifyUser().then(() => {
  setResponse(true);
 })
  setResponse(true);
}

const disableNotifsAndClose = () => {
  setResponse(true);
}

  return (!(response) && !(Notification.permission === 'granted')) ? ( 
  <ChakraProvider theme={theme}>
      <Container>
        <Alert status='success'>
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>
              Would you like to enable notifications?
            </AlertDescription>
          </Box>
          <Button colorScheme='teal' size='sm' onClick={enableNotifsAndClose}>
            Sure!
          </Button>
          <Button colorScheme='gray' size='sm' onClick={disableNotifsAndClose}>
            No thanks!
          </Button>
        </Alert>
      </Container>
  </ChakraProvider>
  ) : (Notification.permission === 'granted') ? (
    <ChakraProvider theme={theme}>
      <Button colorScheme='gray' size='sm' onClick={() => notifyUser("Thanks for watching this video!")}>
        Click to show a thank you!
      </Button>
  </ChakraProvider>
  ) :
  <>
  <h1>You have disabled notifications</h1>
  </>
}

export default App;
