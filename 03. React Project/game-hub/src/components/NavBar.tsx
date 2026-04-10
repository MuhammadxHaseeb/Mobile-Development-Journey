import { HStack, Image} from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColoModeSwitch from './ColoModeSwitch'
import SearchInput from './Searchinput'

interface Props {
    onSearch: (searchText: string) => void;
}


const NavBar = ({onSearch }: Props) => {
  
  return (
    <HStack padding='10px'>
        <Image src={logo} boxSize='60px'></Image>
        <SearchInput onSearch={onSearch} />
        <ColoModeSwitch/>
        
    </HStack>
  )
}

export default NavBar
