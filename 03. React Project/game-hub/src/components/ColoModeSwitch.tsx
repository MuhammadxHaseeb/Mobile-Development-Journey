import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react"

const ColoModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <HStack>
      <Switch 
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      {/* <Text>{colorMode === "dark" ? "Dark Mode" : "Light Mode"}</Text> */}
      <Text whiteSpace='nowrap'>Dark Mode</Text>
    </HStack>
  )
}

export default ColoModeSwitch