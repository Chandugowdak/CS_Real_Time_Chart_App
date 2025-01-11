import React,{useState} from 'react';
import { Input, Button, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';


const Login = () => {
   
  const [email, setEmail] = useState(''); //  THIS IS THE EMAIL STATE
  const [password, setpassword] = useState('');  //THIS IS THE PASSWORD STATE
  const [show, setshow] = useState(false); //THIS IS THE SHOW PASSWORD STATE

  const handelShow = () => setshow(!show); //THIS IS THE SHOW PASSWORD HANDLER

  const handellogin = () => {
    
  } 
  return (
    <VStack>
      

      {/* INPUT THE EMEAIL FROM THE USER */}
      <FormControl id="e-mail" spacing="5px" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
          type="email"
          placeholder='Enter the Email'
        onChange={((e)=>setEmail(e.target.value))}/>
      </FormControl>

      <FormControl id="password" spacing="5px" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input 
            type={show ? "text" : "password"}
            placeholder='Enter the Password'
            onChange={((e)=>setpassword(e.target.value))}
          />
          <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handelShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme='blue' w="100%" mt={4} onClick={handellogin}>
        Login
      </Button>
      {/* FOR THE GUEST USER */}
      <Button
        variant="solid"
        colorScheme='red'
        width="100%"
        onClick={() => {
          setEmail("guest@guest.com");
          setpassword("123456");
      }}>Get Guest Account</Button>
      
    </VStack>
  )
}

export default Login
