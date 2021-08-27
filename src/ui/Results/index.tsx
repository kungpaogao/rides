import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import DayPickerInput from "../DayPickerInput";
import ResultItem from "./ResultItem";

export default function Results() {
  const [filterPrice, setFilterPrice] = useState(20);
  const [filterDistance, setFilterDistance] = useState(10);

  return (
    <Flex direction="column" h="full">
      {/* search bar */}
      <Grid templateColumns={{ md: "repeat(4, 1fr)" }} gap={3} p="3">
        <Input placeholder="From" />
        <Input placeholder="To" />
        <DayPickerInput />
        <Button>Search</Button>
      </Grid>
      <Flex direction="column" flex="1" wrap="wrap">
        {/* TODO: move this full screen modal when screen is too small */}
        <VStack p="3" align="left">
          <Heading size="lg">Filters</Heading>
          <Input placeholder="Start time" />
          <Input placeholder="End time" />
          <FormControl id="distance">
            <FormLabel id="slider-distance">
              Distance: &lt;{filterDistance} miles
            </FormLabel>
            <Slider
              aria-labelledby="slider-distance"
              value={filterDistance}
              min={5}
              max={50}
              step={5}
              onChange={setFilterDistance}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl id="price">
            <FormLabel id="slider-price">Price: &lt;${filterPrice}</FormLabel>
            <Slider
              aria-labelledby="slider-price"
              value={filterPrice}
              onChange={setFilterPrice}
              min={0}
              max={100}
              step={5}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        </VStack>
        <VStack flex="1" align="left" w="full" p="3">
          <Heading size="lg">Results</Heading>
          <ResultItem />
          <ResultItem />
          <ResultItem />
        </VStack>
      </Flex>
    </Flex>
  );
}
