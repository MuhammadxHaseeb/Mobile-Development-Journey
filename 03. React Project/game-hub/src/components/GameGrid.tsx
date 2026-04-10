import { SimpleGrid, Text } from "@chakra-ui/react";
import GamesCard from "./GamesCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import type { GameQuery } from "@/App";
import useGames from "../hooks/useGames";


interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({gameQuery}: Props) => {
  const {data,error,isLoading} = useGames(gameQuery);
  const skeletons = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

  return (
    <>
    {error && <Text>{error}</Text>}
    <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl:4 }} padding='10px' spacing={6}>
        {isLoading && skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton/>
          </GameCardContainer>
        ))}
        {data.map(data => (
          <GameCardContainer key={data.id}>
            <GamesCard game={data}/>
          </GameCardContainer>
        ))}
    </SimpleGrid>
    </>
  )
}

export default GameGrid
