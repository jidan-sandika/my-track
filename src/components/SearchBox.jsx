import { useState } from 'react';
import {
	HStack,
	FormControl,
	Input,
	Button,
	useColorModeValue,
	Heading,
	Text,
	Container,
	Flex,
} from '@chakra-ui/react';

export default function SearchBox({handleSearch}) {

	const [keyword, setKeyword] = useState('');

	function handleClick() {
		handleSearch(keyword)
	}


	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			minW={'75vh'}
			//bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Container
				//maxW={'lg'}
				//bg={useColorModeValue('white', 'whiteAlpha.100')}
				//boxShadow={'xl'}
				//rounded={'lg'}
				//p={6}
			>
				<HStack
					direction={{ base: 'column', md: 'row' }}
					as={'form'}
					spacing={1}
					onSubmit={handleClick}
				>
					<FormControl>
						<Input
                            rounded={'md'}
                            size={'sm'}
							variant={'solid'}
							borderWidth={1}
							color={'gray.300'}
							_placeholder={{
								color: 'gray.300',
							}}
							borderColor={useColorModeValue('gray.300', 'gray.700')}
							placeholder={'Input name tracks...'}
							aria-label={'Input name tracks...'}
							//value={'Tracks'}
							onChange={(event) => {
								setKeyword(event.target.value);
							}}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									handleSearch(keyword);
								}
							}}
						/>
					</FormControl>
					<FormControl w={{ base: '100%', md: '40%' }}>
						<Button onClick={handleClick} size={'sm'} colorScheme='green' w="70%">
							Search
						</Button>
					</FormControl>
				</HStack>
			</Container>
		</Flex>
	);
}
