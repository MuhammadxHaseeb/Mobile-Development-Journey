import useGenres, { type Genre } from "@/hooks/useGenre";
import getCroppedImageUrl from "@/services/image-url";
import { Button, Heading, HStack, Image, List, ListItem, Spinner } from "@chakra-ui/react";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({selectedGenre,onSelectGenre}: Props) => {
  const {data, isLoading, error} = useGenres();

    if (isLoading) return <Spinner/>;
    
    if (error) return null;

    return (
    <>
    <Heading fontSize={'3xl'} marginBottom={2}>Genre</Heading>
    <List>
        {data.map(genre =>
            <ListItem key={genre.id} paddingY='5px'>
                <HStack>
                  <Image boxSize='32px' objectFit='cover' borderRadius={8} src={getCroppedImageUrl(genre.image_background)} />
                  <Button whiteSpace='normal' textAlign='left' fontWeight={genre.id === selectedGenre?.id ? 'bold': 'normal' } onClick={() => onSelectGenre(genre)} fontSize='lg' variant='link'>
                    {genre.name}
                  </Button>
                </HStack>
            </ListItem>
           )}
    </List>
    </>
  )
}

export default GenreList
