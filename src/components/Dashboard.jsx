import {
	Box,
	Flex,
	Avatar,
	HStack,
	Text,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Card,
	CardBody,
	Image,
	Heading,
	Divider,
	CardFooter,
	ButtonGroup,
	Select,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import SearchBox from './SearchBox';
import { useState } from 'react';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = (props) => {
	const { children } = props;
	return (
		<Box
			as="a"
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href={'#'}
		>
			{children}
		</Box>
	);
};

export default function Dashboard({
	handleSearch,
	tracks,
	genres,
	dataRecommendation,
	handleRecom,
	display,
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [keyword, setKeyword] = useState('');

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={1}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={2} alignItems={'center'}>
						<Box color={'green.400'}>MyTrack</Box>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							<NavLink
								onClick={() => {
									alert('Clicked');
								}}
							>
								Recommendation
							</NavLink>
							<Button
								_hover={{
									textDecoration: 'none',
									bg: useColorModeValue('gray.200', 'gray.700'),
								}}
								bg={useColorModeValue('gray.100', 'gray.900')}
								size={'sm'}
								onClick={() => {
									alert('Clicked');
								}}
							>
								Menu
							</Button>
							<Select
								onChange={(event) => {
									handleRecom(event.target.value);
								}}
								size={'md'}
								placeholder="Genres"
							>
								{genres &&
									genres.map((genre, idx) => {
										return (
											<option key={idx} value={genre}>
												{genre}
											</option>
										);
									})}
							</Select>
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<SearchBox handleSearch={handleSearch} />
						<Menu>
							<MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
							>
								<Avatar
									mx={1}
									size={'sm'}
									src={
										'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
									}
								/>
							</MenuButton>
							<MenuList>
								<MenuItem
									bg={'red.400'}
									rounded={'md'}
									onClick={() => {
										alert('logout');
									}}
								>
									Logout
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
							<Select
								onChange={(event) => {
									handleRecom(event.target.value);
								}}
								size={'md'}
								placeholder="Genres"
							>
								{genres &&
									genres.map((genre, idx) => {
										return (
											<option key={idx} value={genre}>
												{genre}
											</option>
										);
									})}
							</Select>
						</Stack>
					</Box>
				) : null}
			</Box>
			<Flex>
				<HStack>
					{display.recom &&
						dataRecommendation.map((data, idx) => {
							return (
								<Box key={idx}>
									<Card key={idx} maxW="sm">
										<CardBody>
											<Image
												src={data.album.images[0].url}
												alt={data.name}
												borderRadius="md"
											/>
											<Stack mt="2" spacing="1">
												<Heading size="md">
													{data.artists[0].name}
												</Heading>
												<Text>{data.name}</Text>
												<Text color="blue.400" fontSize="2xl">
													Popularity {data.popularity}
												</Text>
											</Stack>
										</CardBody>
										<Divider />
										<CardFooter>
											<ButtonGroup spacing="4">
												<Button
													onClick={() => {
														window.open(
															data.external_urls.spotify
														);
													}}
													variant="solid"
													colorScheme="blue"
												>
													Link...
												</Button>
												<Button variant="ghost" colorScheme="blue">
													Add to cart
												</Button>
											</ButtonGroup>
										</CardFooter>
									</Card>
								</Box>
							);
						})}
					{display.search &&
						tracks.map((track, idx) => {
							return (
								<Box key={idx}>
									<Card key={idx} maxW="sm">
										<CardBody>
											<Image
												src={track.album.images[0].url}
												alt={track.name}
												borderRadius="md"
											/>
											<Stack mt="2" spacing="1">
												<Heading size="md">
													{track.album.artists[0].name}
												</Heading>
												<Text>{track.name}</Text>
												<Text color="blue.400" fontSize="2xl">
													Popularity {track.popularity}
												</Text>
											</Stack>
										</CardBody>
										<Divider />
										<CardFooter>
											<ButtonGroup spacing="4">
												<Button
													onClick={() => {
														window.open(
															track.external_urls.spotify
														);
													}}
													variant="solid"
													colorScheme="blue"
												>
													Link...
												</Button>
												<Button variant="ghost" colorScheme="blue">
													Add to cart
												</Button>
											</ButtonGroup>
										</CardFooter>
									</Card>
								</Box>
							);
						})}
				</HStack>
			</Flex>
		</>
	);
}
