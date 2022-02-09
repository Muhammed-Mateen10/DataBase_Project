import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { userLogin } from "../utils/mockApi";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, CircularProgress, Text } from '@chakra-ui/core';

export default function LoginForm() {

    const [stud_id, setid] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const [loggedin, setloggedin] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        setloading(true);
        try {
            await userLogin({ stud_id, password });
            setloggedin(true);
            setloading(false);
        } catch (error) {
            seterror('Invalid Id or Password');
            setid('');
            setpassword('');
            setloading(false);
        }

        // alert(`Id: ${stud_id} & Password: ${password}`);
    }

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                {loggedin ? (<Box textalign="center" ><Text>{stud_id} Successfully logged in!</Text>
                    <Button variantColor="orange" variant="outline" width="full" mt={4}
                        onClick={() => setloggedin(false)}>
                        Sign Out</Button></Box>) : (<><Box textAlign="center" >
                            <Heading>Login</Heading>
                        </Box>
                            <Box mt={4}>
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    <FormControl isRequired>
                                        <FormLabel>Student_id</FormLabel>
                                        <Input type="text" placeholder="19K-XXXX" onChange={event => setid(event.currentTarget.value)} />
                                    </FormControl>
                                    <FormControl mt={6} isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" onChange={event => setpassword(event.currentTarget.value)} />
                                    </FormControl>
                                    <Button width="full" variant="outline" variantColor="teal" mt={4} type="submit" >
                                        {loading ?
                                            (<CircularProgress
                                                isIndeterminate
                                                size="23px"
                                                color="teal" />) :
                                            ('Sign In')
                                        }
                                    </Button>
                                </form>
                            </Box> </>)}


            </Box>
        </Flex>
    );
}