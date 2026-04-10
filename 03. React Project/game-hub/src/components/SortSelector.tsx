import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'

interface Props {
  onSelectedSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({onSelectedSortOrder, sortOrder}: Props) => {
  
const sortOrders = [
    { value: '', label: 'relevance'},
    { value: '-added', label: 'Date added'},
    { value: 'name', label: 'Name'},
    { value: '-released', label: 'Relaease date'},
    { value: '-metacritic', label: 'Popularity'},
    { value: '-rating', label: 'Average rating'}, 
];

const currentSortOrder = sortOrders.find(order => order.value === sortOrder)

  return (
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown/>}>
            Order by: {currentSortOrder?.label || 'Relevance'}
          </MenuButton>
          <MenuList>
            {sortOrders.map(order =>
              <MenuItem key={order.value} value={order.value} onClick={() => onSelectedSortOrder(order.value)}>
                {order.label}
              </MenuItem>
            )}
          </MenuList>
        </Menu>
  )
}

export default SortSelector
