import React, { Component } from "react";
import {
  Flex,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Stack,
  CardHeader,
  list,
} from "@chakra-ui/react";
import castorImage from "../imgs/castor.webp";
import sadPoussin from "../imgs/sad_poussin.jpg";
import eauMarron from "../imgs/eau_marron.jpg";
import deversementEau from "../imgs/deversement_eau.webp";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPosts: [],
    };
  }

  componentDidMount() {
    this.setState({
      listPosts: [
        {
          title: "Castor malheureux sur son petit rondin",
          picture: castorImage,
          bodyText:
            "Petit Castor trouvé aux abords de la Folie Couvre Chef vers 18h le 13 Janvier 2024. L'animal était apparement seul, privé de ses congénères et semblait très triste. Il subit les agissements de la mairie de Caen.",
          date: "Hier",
        },
        {
          title: "Poussin abandonné par la mairie",
          picture: sadPoussin,
          bodyText:
            "Un poussin à la rue ! La mairie a abandonné sa mascotte Poussinus pour cause de défécation sur des papiers administratifs. Est-ce trop demander de prendre soin de ces petites bêtes ?",
          date: "Avant Hier",
        },
        {
          title: "Etat de l'eau à Caen",
          picture: eauMarron,
          bodyText:
            "Plusieurs clichés nous montrent que l'état de l'eau est catastrophique dans notre autrefois belle commune de Caen. Le traitement des eaux par la mairie nous laisse avec beaucoup d'interrogations...",
          date: "10 Janvier",
        },
        {
          title: "Nestlo deverse ses eaux polluées dans l'Orne !",
          picture: deversementEau,
          bodyText:
            "Un reporter audacieux a pu prendre en photo les pratiques honteuses de Nestlo. Cette enterprise se croit tout permis et deverse directement ses déchets dans l'Orne. Nous ne laisserons pas ces actes impunis ",
          date: "9 Janvier",
        },
      ],
    });
  }

  // Function to render card
  renderCard(imageSrc, headingText, bodyText, dateText) {
    return (
      <Card maxW="sm">
        <CardHeader></CardHeader>
        <CardBody>
        <Image 
          src={imageSrc} 
          borderRadius="lg"
          width="100%" // Set the width to 100% of the CardBody
          height="200px" // Set a fixed height
          objectFit="cover" // Cover the area without stretching the image
        />
          <Stack mt="6" spacing="3">
            <Heading size="md">{headingText}</Heading>
            <Text backgroundColor={"white"}>{bodyText}</Text>
            <Text color="blue.600" fontSize="2xl">
              {dateText}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  // Function to render rows of cards
  renderRows() {
    const { listPosts } = this.state;
    console.log(listPosts.length);
    const rowElements = [];

    // Grouping posts in pairs
    for (let i = 0; i < listPosts.length; i += 2) {
      const row = (
        <Flex
          align="center"
          justify="center"
          className="rowCard"
          key={`row-${i}`}
        >
          {this.renderCard(
            listPosts[i].picture,
            listPosts[i].title,
            listPosts[i].bodyText,
            listPosts[i].date
          )}
          {i + 1 < listPosts.length &&
            this.renderCard(
              listPosts[i + 1].picture,
              listPosts[i + 1].title,
              listPosts[i + 1].bodyText,
              listPosts[i + 1].date
            )}
        </Flex>
      );

      rowElements.push(row);
    }

    return rowElements;
  }

  render() {
    return (
      <>
        <main className="content bodyColor">{this.renderRows()}</main>
      </>
    );
  }
}

export default Posts;