import React,{useState} from 'react'
import { Input,Button,InputGroup, InputRightElement } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { FormControl , FormLabel ,} from '@chakra-ui/react';
const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const HandelForm = async () => {
        alert("Hello")
        
    }
    const handleClick = () => setShow(!show);  //HANDEL THE SHOW PASSWORD AND HIDE PASSWORD FEATURE
    
    const PostDetails = (pics)=>{}  //THIS IS FOR THE IMAGE UPLOADING FEATURE
  return (
    <VStack  spacing="5px" align="flex-center">
      {/* THIS IS FOR THE INPUT OF USER NAME */}
      <FormControl spacing="5px" id="first-name" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter First Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* THIS IS FOR THE EMAIL INPUT */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* THIS IS FOR THR PASSWORD */}

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            //   THIS SAY WEATHER TO SHOW THR PASSWORD OR TO HIDE
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            {/* THIS IS TO DISPLAY SHOW AND HIDE PASSWORD */}
            <Button h="1.75rem " size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.file[0])}
                  />
                  {/* THIS INPUTELEMENTRIGHT IS TO PRINT THE BUTTON IN THE RIGHT SIDE */}
                  <InputRightElement width="4.5rem">
            <Button h="1.75rem " size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
                  </InputRightElement>    
                  
        </InputGroup>
          </FormControl>
          
          {/* THIS IS FOR ADDING THE IMAGE */}
          <FormControl id="image" isRequired>
              <FormLabel>Image</FormLabel>
              <Input type="file" onChange={(e)=> PostDetails(e.target.value)} ></Input>
           </FormControl>

      <Button onClick={HandelForm} colorScheme="blue" mt="4"  type="submit">
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp
