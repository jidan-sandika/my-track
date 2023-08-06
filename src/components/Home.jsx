import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';

export default function Home({
	clientId,
	redirectUri,
	authEndpoint,
	responseType,
}) {
	return (
		<>
			<Container maxW={'3xl'}>
				<Stack
					as={Box}
					textAlign={'center'}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}
				>
					<Heading
						fontWeight={600}
						fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
						lineHeight={'110%'}
						color={'green.400'}
					>
						Spotify
						<Text as={'span'} color={'green.400'}></Text>
					</Heading>
					<Text color={'gray.500'}>
						Spotify is a digital music, podcast, and video service that
						gives you access to millions of songs and other content from
						creators all over the world.
					</Text>
					<Stack
						direction={'column'}
						spacing={3}
						align={'center'}
						alignSelf={'center'}
						position={'relative'}
					>
						<a
							href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
						>
							<Button
								colorScheme={'green'}
								bg={'green.400'}
								rounded={'full'}
								px={6}
								_hover={{
									bg: 'green.500',
								}}
							>
								Login
							</Button>
						</a>
					</Stack>
				</Stack>
			</Container>
		</>
	);
}
